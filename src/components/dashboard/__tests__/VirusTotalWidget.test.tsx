/**
 * VirusTotal Widget Tests
 * Owner: Kubca - VT widget testing
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import VirusTotalWidget from '../VirusTotalWidget'

// Mock hooks
vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'VT_SCANNER_TITLE': 'VirusTotal Scanner',
        'VT_UPLOAD_FILE': 'Upload File',
        'VT_SCANNING': 'Scanning...'
      }
      return translations[key] || key
    }
  })
}))

vi.mock('@/hooks/useVirusTotal', () => ({
  useVirusTotal: () => ({
    scanFiles: [],
    isUploading: false,
    uploadFiles: vi.fn(),
    removeScanFile: vi.fn(),
    getRecentScans: vi.fn(() => [])
  }),
  useVTStats: () => ({
    stats: {
      totalScans: 0,
      maliciousFound: 0,
      cleanFiles: 0,
      xpEarned: 0
    },
    isLoading: false
  }),
  vtUtils: {
    formatFileSize: (bytes: number) => `${bytes} B`,
    getVerdictColor: () => 'text-gray-400',
    getVerdictText: () => 'Unknown'
  }
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}))

describe('VirusTotalWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders widget with title and upload area', () => {
    render(<VirusTotalWidget />)
    
    expect(screen.getByText('VirusTotal Scanner')).toBeInTheDocument()
    expect(screen.getByText('Upload File')).toBeInTheDocument()
    expect(screen.getByText(/Max 32MB/)).toBeInTheDocument()
  })

  it('handles drag and drop events', async () => {
    render(<VirusTotalWidget />)
    
    const uploadArea = screen.getByText('Upload File').closest('div')
    expect(uploadArea).toBeInTheDocument()

    // Test drag over
    fireEvent.dragOver(uploadArea!, { dataTransfer: { files: [] } })
    expect(screen.getByText('Pusťte soubory zde')).toBeInTheDocument()

    // Test drag leave
    fireEvent.dragLeave(uploadArea!)
    expect(screen.getByText('Upload File')).toBeInTheDocument()
  })

  it('validates file size limits', async () => {
    const mockUploadFiles = vi.fn()
    vi.mocked(require('@/hooks/useVirusTotal').useVirusTotal).mockReturnValue({
      scanFiles: [],
      isUploading: false,
      uploadFiles: mockUploadFiles,
      removeScanFile: vi.fn(),
      getRecentScans: vi.fn(() => [])
    })

    render(<VirusTotalWidget />)
    
    const fileInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement
    
    // Create oversized file (33MB)
    const oversizedFile = new File(['x'.repeat(33 * 1024 * 1024)], 'large.txt', {
      type: 'text/plain'
    })

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [oversizedFile] } })
    })

    // Should not call uploadFiles for oversized file
    expect(mockUploadFiles).not.toHaveBeenCalled()
  })

  it('displays scan files with progress', () => {
    const mockScanFiles = [
      {
        file: new File(['test'], 'test.txt', { type: 'text/plain' }),
        uploadProgress: 50,
        scanId: 'test-id'
      }
    ]

    vi.mocked(require('@/hooks/useVirusTotal').useVirusTotal).mockReturnValue({
      scanFiles: mockScanFiles,
      isUploading: true,
      uploadFiles: vi.fn(),
      removeScanFile: vi.fn(),
      getRecentScans: vi.fn(() => [])
    })

    render(<VirusTotalWidget />)
    
    expect(screen.getByText('test.txt')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('Nahrávání...')).toBeInTheDocument()
  })

  it('displays error state for failed uploads', () => {
    const mockScanFiles = [
      {
        file: new File(['test'], 'test.txt', { type: 'text/plain' }),
        uploadProgress: 100,
        error: 'Upload failed'
      }
    ]

    vi.mocked(require('@/hooks/useVirusTotal').useVirusTotal).mockReturnValue({
      scanFiles: mockScanFiles,
      isUploading: false,
      uploadFiles: vi.fn(),
      removeScanFile: vi.fn(),
      getRecentScans: vi.fn(() => [])
    })

    render(<VirusTotalWidget />)
    
    expect(screen.getByText('test.txt')).toBeInTheDocument()
    expect(screen.getByText('Upload failed')).toBeInTheDocument()
  })

  it('displays statistics when available', () => {
    vi.mocked(require('@/hooks/useVirusTotal').useVTStats).mockReturnValue({
      stats: {
        totalScans: 10,
        maliciousFound: 2,
        cleanFiles: 8,
        xpEarned: 50
      },
      isLoading: false
    })

    render(<VirusTotalWidget />)
    
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('Celkem skenů')).toBeInTheDocument()
  })

  it('does not display stats when no scans exist', () => {
    vi.mocked(require('@/hooks/useVirusTotal').useVTStats).mockReturnValue({
      stats: {
        totalScans: 0,
        maliciousFound: 0,
        cleanFiles: 0,
        xpEarned: 0
      },
      isLoading: false
    })

    render(<VirusTotalWidget />)
    
    expect(screen.queryByText('Celkem skenů')).not.toBeInTheDocument()
  })
})