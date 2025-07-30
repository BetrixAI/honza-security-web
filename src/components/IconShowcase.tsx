'use client'

import React from 'react'

// Lucide React Icons (již používané)
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Mail, 
  User, 
  ArrowRight,
  Menu,
  X,
  Bell,
  ShoppingCart,
  Video,
  Users,
  CheckCircle,
  Play,
  TrendingUp,
  Star,
  Quote,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Chrome,
  Github
} from 'lucide-react'

// Heroicons
import {
  HomeIcon,
  CogIcon,
  DocumentIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckBadgeIcon,
  AcademicCapIcon,
  BoltIcon,
  FireIcon,
  SparklesIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  ServerIcon,
  CommandLineIcon,
  CpuChipIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'

// React Icons (pro více možností)
import {
  FiDatabase,
  FiCloud,
  FiWifi,
  FiMonitor,
  FiSmartphone,
  FiHardDrive,
  FiKey,
  FiAlertTriangle,
  FiInfo,
  FiCheckCircle,
  FiX,
  FiPlus,
  FiMinus,
  FiEdit,
  FiTrash,
  FiDownload,
  FiUpload,
  FiRefreshCw,
  FiSettings
} from 'react-icons/fi'

// Tabler Icons
import {
  IconBrandFirebase,
  IconNetworkOff,
  IconFingerprint,
  IconScan,
  IconBugOff,
  IconAlertTriangle as TablerAlert,
  IconShieldCheck,
  IconEyeCheck,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconWorldWww,
  IconApiApp,
  IconBrandGoogle,
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconPhone,
  IconMapPin
} from '@tabler/icons-react'

const IconSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="security-card mb-8">
    <h3 className="text-xl font-semibold text-white mb-6 gradient-text-blue">{title}</h3>
    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
      {children}
    </div>
  </div>
)

const IconItem = ({ icon: Icon, name }: { icon: React.ComponentType<any>; name: string }) => (
  <div className="flex flex-col items-center p-3 rounded-lg bg-dark-surface hover:bg-dark-card transition-all duration-300 group cursor-pointer">
    <Icon className="w-6 h-6 text-gray-400 group-hover:text-security-blue-400 transition-colors duration-300" />
    <span className="text-xs text-gray-500 mt-2 text-center group-hover:text-gray-300 transition-colors duration-300">
      {name}
    </span>
  </div>
)

export default function IconShowcase() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Dostupné <span className="gradient-text-blue">ikony</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Přehled všech dostupných ikon v projektu pro snadné použití a referenci
        </p>
      </div>

      {/* Lucide React Icons */}
      <IconSection title="Lucide React Icons (hlavní sada)">
        <IconItem icon={Shield} name="Shield" />
        <IconItem icon={Lock} name="Lock" />
        <IconItem icon={Eye} name="Eye" />
        <IconItem icon={EyeOff} name="EyeOff" />
        <IconItem icon={Mail} name="Mail" />
        <IconItem icon={User} name="User" />
        <IconItem icon={ArrowRight} name="ArrowRight" />
        <IconItem icon={Menu} name="Menu" />
        <IconItem icon={X} name="X" />
        <IconItem icon={Bell} name="Bell" />
        <IconItem icon={ShoppingCart} name="Cart" />
        <IconItem icon={Video} name="Video" />
        <IconItem icon={Users} name="Users" />
        <IconItem icon={CheckCircle} name="Check" />
        <IconItem icon={Play} name="Play" />
        <IconItem icon={TrendingUp} name="Trending" />
        <IconItem icon={Star} name="Star" />
        <IconItem icon={Quote} name="Quote" />
        <IconItem icon={Phone} name="Phone" />
        <IconItem icon={MapPin} name="MapPin" />
        <IconItem icon={Facebook} name="Facebook" />
        <IconItem icon={Twitter} name="Twitter" />
        <IconItem icon={Linkedin} name="LinkedIn" />
        <IconItem icon={Youtube} name="YouTube" />
        <IconItem icon={Chrome} name="Chrome" />
        <IconItem icon={Github} name="GitHub" />
      </IconSection>

      {/* Heroicons */}
      <IconSection title="Heroicons (rozšířená sada)">
        <IconItem icon={HomeIcon} name="Home" />
        <IconItem icon={CogIcon} name="Settings" />
        <IconItem icon={DocumentIcon} name="Document" />
        <IconItem icon={ChartBarIcon} name="Chart" />
        <IconItem icon={UserGroupIcon} name="UserGroup" />
        <IconItem icon={ShieldCheckIcon} name="ShieldCheck" />
        <IconItem icon={ExclamationTriangleIcon} name="Warning" />
        <IconItem icon={InformationCircleIcon} name="Info" />
        <IconItem icon={CheckBadgeIcon} name="Badge" />
        <IconItem icon={AcademicCapIcon} name="Academic" />
        <IconItem icon={BoltIcon} name="Bolt" />
        <IconItem icon={FireIcon} name="Fire" />
        <IconItem icon={SparklesIcon} name="Sparkles" />
        <IconItem icon={RocketLaunchIcon} name="Rocket" />
        <IconItem icon={GlobeAltIcon} name="Globe" />
        <IconItem icon={ServerIcon} name="Server" />
        <IconItem icon={CommandLineIcon} name="Terminal" />
        <IconItem icon={CpuChipIcon} name="CPU" />
        <IconItem icon={DevicePhoneMobileIcon} name="Mobile" />
        <IconItem icon={ComputerDesktopIcon} name="Desktop" />
      </IconSection>

      {/* React Icons (Feather) */}
      <IconSection title="React Icons (Feather style)">
        <IconItem icon={FiDatabase} name="Database" />
        <IconItem icon={FiCloud} name="Cloud" />
        <IconItem icon={FiWifi} name="WiFi" />
        <IconItem icon={FiMonitor} name="Monitor" />
        <IconItem icon={FiSmartphone} name="Phone" />
        <IconItem icon={FiHardDrive} name="Storage" />
        <IconItem icon={FiKey} name="Key" />
        <IconItem icon={FiAlertTriangle} name="Alert" />
        <IconItem icon={FiInfo} name="Info" />
        <IconItem icon={FiCheckCircle} name="Success" />
        <IconItem icon={FiX} name="Close" />
        <IconItem icon={FiPlus} name="Add" />
        <IconItem icon={FiMinus} name="Remove" />
        <IconItem icon={FiEdit} name="Edit" />
        <IconItem icon={FiTrash} name="Delete" />
        <IconItem icon={FiDownload} name="Download" />
        <IconItem icon={FiUpload} name="Upload" />
        <IconItem icon={FiRefreshCw} name="Refresh" />
        <IconItem icon={FiSettings} name="Settings" />
      </IconSection>

      {/* Tabler Icons */}
      <IconSection title="Tabler Icons (Security specialized)">
        <IconItem icon={IconBrandFirebase} name="Firebase" />
        <IconItem icon={IconNetworkOff} name="NoNetwork" />
        <IconItem icon={IconFingerprint} name="Biometric" />
        <IconItem icon={IconScan} name="Scan" />
        <IconItem icon={IconBugOff} name="NoBugs" />
        <IconItem icon={TablerAlert} name="Alert" />
        <IconItem icon={IconShieldCheck} name="Verified" />
        <IconItem icon={IconEyeCheck} name="Verified" />
        <IconItem icon={IconDeviceLaptop} name="Laptop" />
        <IconItem icon={IconDeviceMobile} name="Mobile" />
        <IconItem icon={IconWorldWww} name="Web" />
        <IconItem icon={IconApiApp} name="API" />
        <IconItem icon={IconBrandGoogle} name="Google" />
        <IconItem icon={IconBrandGithub} name="GitHub" />
        <IconItem icon={IconBrandLinkedin} name="LinkedIn" />
        <IconItem icon={IconMail} name="Email" />
        <IconItem icon={IconPhone} name="Phone" />
        <IconItem icon={IconMapPin} name="Location" />
      </IconSection>

      {/* Usage examples */}
      <div className="security-card">
        <h3 className="text-xl font-semibold text-white mb-6 gradient-text-blue">
          Příklady použití
        </h3>
        <div className="space-y-4 text-gray-300">
          <div className="bg-dark-surface p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Import:</p>
            <code className="text-security-blue-400">
              {`import { Shield } from 'lucide-react'`}
            </code>
          </div>
          <div className="bg-dark-surface p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Použití:</p>
            <code className="text-security-blue-400">
              {`<Shield className="w-6 h-6 text-security-blue-400" />`}
            </code>
          </div>
          <div className="bg-dark-surface p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">S hover efektem:</p>
            <code className="text-security-blue-400">
              {`<Shield className="w-6 h-6 text-gray-400 hover:text-security-blue-400 transition-colors duration-300" />`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
} 