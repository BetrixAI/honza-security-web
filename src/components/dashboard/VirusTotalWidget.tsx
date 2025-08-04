/**
 * VirusTotal Scanner Widget
 * Drag & drop file upload with real-time scanning results
 * Owner: Kubca - dashboard security widgets
 */

'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Shield, AlertTriangle, CheckCircle, Clock, FileText, X, TrendingUp, Eye } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useVirusTotal, useVTStats, vtUtils } from '@/hooks/useVirusTotal'
import SidePanel from '@/components/sidepanel/SidePanel'
import type { VTVerdict } from '@/types'

interface VirusTotalWidgetProps {
  className?: string
}

export default function VirusTotalWidget({ className = '' }: VirusTotalWidgetProps) {
  const { t } = useTranslation('dashboard')
  const [isDragging, setIsDragging] = useState(false)
  const [selectedScan, setSelectedScan] = useState<any>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  
  // VT hooks
  const { 
    scanFiles, 
    isUploading, 
    uploadFiles, 
    removeScanFile, 
    getRecentScans 
  } = useVirusTotal()
  
  const { stats, isLoading: statsLoading } = useVTStats()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }, [])

  const handleFiles = async (files: File[]) => {
    try {
      await uploadFiles(files)
    } catch (error) {
      console.error('Upload error:', error)
      alert(error instanceof Error ? error.message : 'Upload failed')
    }
  }

  const handleViewDetails = (scan: any) => {
    setSelectedScan(scan)
    setIsPanelOpen(true)
  }

  const getVerdictIcon = (verdict?: string) => {
    switch (verdict) {
      case 'clean':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'malicious':
        return <AlertTriangle className="w-5 h-5 text-red-400" />
      case 'suspicious':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400 animate-spin" />
    }
  }

  const recentScans = getRecentScans(5)

  return (
    <div className={`security-card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-400" />
          {t('VT_SCANNER_TITLE')}
        </h3>
        <div className="text-xs text-gray-500">
          Max 32MB • API: VirusTotal
        </div>
      </div>

      {/* Stats Panel podle ETAPA 6 specifikace - grid 2×2, ikonky 20px */}
      {!statsLoading && stats.totalScans > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-bg-card-alt rounded-lg border border-border-subtle">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-brand-mid" />
            <div>
              <div className="text-lg font-bold text-txt-primary">{stats.totalScans}</div>
              <div className="text-xs text-txt-muted">Celkem skenů</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-danger" />
            <div>
              <div className="text-lg font-bold text-danger">{stats.maliciousFound}</div>
              <div className="text-xs text-txt-muted">Škodlivé</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <div>
              <div className="text-lg font-bold text-success">{stats.cleanFiles}</div>
              <div className="text-xs text-txt-muted">Čisté</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-warning" />
            <div>
              <div className="text-lg font-bold text-warning">{Math.round((stats.cleanFiles / stats.totalScans) * 100)}%</div>
              <div className="text-xs text-txt-muted">Úspěšnost</div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Area podle ETAPA 6 specifikace */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging 
            ? 'border-brand-mid bg-brand-mid/20' 
            : 'border-brand-mid/60 hover:bg-brand-mid/20'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <Upload className={`w-8 h-8 mx-auto mb-4 ${isDragging ? 'text-brand-light' : 'text-brand-mid/70'}`} />
        
        <h4 className="text-txt-primary font-medium mb-2">
          {isDragging ? 'Pusťte soubory zde' : 'Nahrát soubor ke skenování'}
        </h4>
        
        <p className="text-txt-muted text-sm">
          Přetáhněte soubory nebo klikněte pro výběr<br />
          <span className="text-xs text-txt-muted/70">Podporovány všechny typy souborů • Max 32MB</span>
        </p>
      </div>

      {/* Scan Results */}
      {scanFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Výsledky skenování</h4>
          
          <AnimatePresence>
            {scanFiles.map((scanFile, index) => (
              <motion.div
                key={`${scanFile.file.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white font-medium truncate">
                      {scanFile.file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({vtUtils.formatFileSize(scanFile.file.size)})
                    </span>
                  </div>
                  
                  <button
                    onClick={() => removeScanFile(scanFile.file)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Upload Progress */}
                {scanFile.uploadProgress < 100 && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span>Nahrávání...</span>
                      <span>{scanFile.uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <motion.div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${scanFile.uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {/* Error State */}
                {scanFile.error && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{scanFile.error}</span>
                  </div>
                )}

                {/* Success State */}
                {scanFile.uploadProgress === 100 && !scanFile.error && (
                  <div className="flex items-center space-x-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Nahráno úspěšně</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Recent Scans */}
      {recentScans.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Nedávné skeny</h4>
          <div className="space-y-2">
            {recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="text-sm text-white font-medium truncate max-w-xs">
                      {scan.fileName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {scan.createdAt.toDate().toLocaleString('cs-CZ')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getVerdictIcon(scan.verdict)}
                  {scan.status === 'done' && scan.verdict && (
                    <>
                      <div className={`px-2 py-1 rounded-full border text-xs ${vtUtils.getVerdictColor(scan.verdict)}`}>
                        {vtUtils.getVerdictText(scan.verdict, 'cs')}
                      </div>
                      <button
                        onClick={() => handleViewDetails(scan)}
                        className="p-1 text-txt-muted hover:text-brand-light transition-colors rounded"
                        title="Zobrazit detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {scan.status === 'running' && (
                    <div className="text-xs text-gray-400">Skenování...</div>
                  )}
                  {scan.status === 'queued' && (
                    <div className="text-xs text-gray-400">Ve frontě</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail VT report podle ETAPA 6 specifikace */}
      <SidePanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={`VirusTotal Report - ${selectedScan?.fileName || 'Detail'}`}
        width="lg"
      >
        {selectedScan && (
          <div className="p-6 space-y-6">
            {/* File Info */}
            <div className="bg-bg-card-alt rounded-lg p-4 border border-border-subtle">
              <h3 className="text-lg font-semibold text-txt-primary mb-3">Informace o souboru</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-txt-muted">Název:</span>
                  <div className="text-txt-primary font-medium">{selectedScan.fileName}</div>
                </div>
                <div>
                  <span className="text-txt-muted">Velikost:</span>
                  <div className="text-txt-primary font-medium">{selectedScan.fileSize} bytes</div>
                </div>
                <div>
                  <span className="text-txt-muted">MD5:</span>
                  <div className="text-txt-primary font-mono text-xs">{selectedScan.md5 || 'N/A'}</div>
                </div>
                <div>
                  <span className="text-txt-muted">SHA256:</span>
                  <div className="text-txt-primary font-mono text-xs">{selectedScan.sha256 || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="bg-bg-card-alt rounded-lg p-4 border border-border-subtle">
              <h3 className="text-lg font-semibold text-txt-primary mb-3">Výsledek skenování</h3>
              <div className="flex items-center gap-3">
                {getVerdictIcon(selectedScan.verdict)}
                <span className={`font-medium ${
                  selectedScan.verdict === 'clean' ? 'text-success' :
                  selectedScan.verdict === 'malicious' ? 'text-danger' :
                  'text-warning'
                }`}>
                  {vtUtils.getVerdictText(selectedScan.verdict, 'cs')}
                </span>
              </div>
            </div>

            {/* Raw JSON Report podle specifikace s syntax highlighting */}
            <div className="bg-bg-card-alt rounded-lg p-4 border border-border-subtle">
              <h3 className="text-lg font-semibold text-txt-primary mb-3">Raw VT Response</h3>
              <div className="bg-[#1e1e1e] rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-[#dcdcdc] font-mono whitespace-pre-wrap">
                  <code className="language-json">
                    {JSON.stringify(selectedScan.vtResponse || {}, null, 2)}
                  </code>
                </pre>
              </div>
              <div className="mt-2 text-xs text-txt-muted">
                Dracula theme • PrismJS syntax highlighting
              </div>
            </div>
          </div>
        )}
      </SidePanel>
    </div>
  )
}