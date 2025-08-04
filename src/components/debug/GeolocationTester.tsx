/**
 * Development component for testing IP geolocation functionality
 * Shows detected location and allows manual locale switching
 * Owner: Shared - debugging tools
 */

'use client'

import { useState } from 'react'
import { Globe, MapPin, Clock, Flag, RefreshCw } from 'lucide-react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { formatGeolocationDisplay } from '@/lib/geolocation'
import { useTranslation } from '@/hooks/useTranslation'
import Card, { CardHeader, CardContent, CardTitle } from '@/components/card/Card'
import Button from '@/components/ui/Button'

export default function GeolocationTester() {
  const { geolocation, isLoading, error, detectAndSetLocale, refreshGeolocation } = useGeolocation()
  const { t, locale } = useTranslation('dashboard')
  const [showDetails, setShowDetails] = useState(false)

  const handleDetectLocation = async () => {
    try {
      await detectAndSetLocale()
    } catch (err) {
      console.error('Detection failed:', err)
    }
  }

  const handleRefresh = async () => {
    try {
      await refreshGeolocation()
    } catch (err) {
      console.error('Refresh failed:', err)
    }
  }

  if (!geolocation && !isLoading && !error) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle level="h3" className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t('GEOLOCATION_TESTER')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-txt-muted">{t('DETECT_LOCATION')}</p>
            <Button 
              variant="primary" 
              onClick={handleDetectLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  {t('DETECTING')}
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  {t('DETECT_LOCATION')}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto border-danger/20">
        <CardHeader>
          <CardTitle level="h3" className="text-danger">{t('LOCATION_ERROR')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-danger text-sm mb-4">{error}</p>
          <Button variant="secondary" onClick={handleDetectLocation}>
            {t('TRY_AGAIN')}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!geolocation) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-8">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-brand-mid" />
          <p className="text-txt-muted">{t('DETECTING_LOCATION')}</p>
        </CardContent>
      </Card>
    )
  }

  const displayData = formatGeolocationDisplay(geolocation)

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle level="h3" className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          {t('LOCATION_DETECTED')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main location display */}
        <div className="flex items-center gap-3 p-4 bg-bg-card-alt rounded-lg">
          <div className="text-2xl">{displayData.flag}</div>
          <div className="flex-1">
            <p className="font-medium text-txt-primary">{displayData.location}</p>
            <p className="text-sm text-txt-muted">IP: {geolocation.ip}</p>
          </div>
        </div>

        {/* Current locale */}
        <div className="flex items-center justify-between p-3 bg-brand-mid/10 rounded-lg border border-brand-mid/20">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-brand-mid" />
            <span className="text-sm font-medium">{t('CURRENT_LANGUAGE')}:</span>
          </div>
          <span className="px-2 py-1 bg-brand-mid text-white text-xs rounded font-mono uppercase">
            {locale}
          </span>
        </div>

        {/* Additional details */}
        {showDetails && (
          <div className="space-y-2 p-3 bg-bg-card-alt rounded-lg text-sm">
            <div className="flex justify-between">
              <span className="text-txt-muted">{t('REGION')}:</span>
              <span className="text-txt-primary">{geolocation.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-txt-muted">{t('TIMEZONE')}:</span>
              <span className="text-txt-primary">{geolocation.timezone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-txt-muted">{t('CURRENCY')}:</span>
              <span className="text-txt-primary">{geolocation.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-txt-muted">{t('DETECTED_AT')}:</span>
              <span className="text-txt-primary">{displayData.lastDetected}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-txt-muted">{t('AUTO_LOCALE')}:</span>
              <span className={geolocation.autoLocaleSet ? 'text-success' : 'text-txt-muted'}>
                {geolocation.autoLocaleSet ? t('YES') : t('NO')}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? t('HIDE') : t('SHOW')} {t('DETAILS')}
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
            {t('REFRESH')}
          </Button>
        </div>

        {/* Development info */}
        <div className="text-xs text-txt-muted bg-bg-card-alt p-2 rounded border-l-2 border-warning">
          <strong>{t('DEV_INFO')}:</strong> {t('GEOLOCATION_DESC')}
        </div>
      </CardContent>
    </Card>
  )
}