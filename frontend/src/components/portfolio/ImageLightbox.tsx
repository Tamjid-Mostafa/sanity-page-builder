'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { X, ZoomIn, ZoomOut, Download, Share2, MapPin, Tag, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { urlForImage, type SanityImageField } from '@/sanity/lib/image'

interface PortfolioAsset {
  _id: string
  title: string | null
  image?: SanityImageField
  scene?: string | null
  style?: string | null
  propertyType?: string | null
  portfolioMetadata?: {
    projectName?: string | null
    location?: string | null
    propertyValue?: string | null
    featured?: boolean | null
  } | null
}

interface ImageLightboxProps {
  images: PortfolioAsset[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export default function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  // Set initial slide when dialog opens
  useEffect(() => {
    if (isOpen && api) {
      api.scrollTo(initialIndex, true)
      setCurrent(initialIndex)
    }
  }, [isOpen, initialIndex, api])

  // Update current slide when carousel changes
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
      setIsZoomed(false) // Reset zoom on slide change
    }

    api.on('select', onSelect)
    
    // Initial setup
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Keyboard navigation - includes arrow keys for carousel navigation
  useEffect(() => {
    if (!isOpen || !api) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(!isZoomed)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        api.scrollPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        api.scrollNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isZoomed, onClose, api])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[current]
  const currentImageBuilt = urlForImage(currentImage?.image, { maxWidth: 2000 })
  const imageUrl = currentImageBuilt?.src
  const projectName = currentImage?.portfolioMetadata?.projectName || currentImage?.title || 'Untitled'
  const location = currentImage?.portfolioMetadata?.location
  const propertyValue = currentImage?.portfolioMetadata?.propertyValue
  const scene = currentImage?.scene
  const style = currentImage?.style
  const isFeatured = currentImage?.portfolioMetadata?.featured

  const handleDownload = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank')
    }
  }

  const handleShare = async () => {
    if (navigator.share && imageUrl) {
      try {
        await navigator.share({
          title: projectName,
          text: `Check out this property: ${projectName}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share failed:', err)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 gap-0 bg-black/98 border-zinc-800/50 overflow-hidden">
        {/* Header */}
        <DialogHeader className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 pr-4 min-w-0">
              <DialogTitle className="text-xl md:text-2xl font-bold text-white mb-2 truncate">
                {projectName}
              </DialogTitle>
              <DialogDescription className="text-gray-300 flex flex-wrap gap-2 md:gap-3 items-center text-sm">
                {location && (
                  <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{location}</span>
                  </span>
                )}
                {propertyValue && (
                  <span className="text-primary font-semibold bg-primary/20 px-2 py-1 rounded-full">
                    {propertyValue}
                  </span>
                )}
                <span className="text-gray-400 text-xs ml-auto">
                  {current + 1} / {images.length}
                </span>
              </DialogDescription>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "h-8 w-8 md:h-10 md:w-10 text-white hover:bg-white/20 backdrop-blur-sm transition-all",
                  isZoomed && "bg-white/20 ring-2 ring-white/40"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? 'Zoom Out (Z)' : 'Zoom In (Z)'}
              >
                {isZoomed ? <ZoomOut className="h-4 w-4 md:h-5 md:w-5" /> : <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 md:h-10 md:w-10 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={handleDownload}
                title="Download Image"
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 md:h-10 md:w-10 text-white hover:bg-white/20 backdrop-blur-sm"
                onClick={handleShare}
                title="Share"
              >
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 md:h-10 md:w-10 text-white hover:bg-white/20 backdrop-blur-sm ml-1"
                onClick={onClose}
                title="Close (ESC)"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Carousel */}
        <div className="relative w-full h-full flex items-center justify-center pt-20 pb-24 overflow-hidden">
          <Carousel
            setApi={setApi}
            className={cn(
              "w-full h-full",
              isZoomed && "overflow-visible"
            )}
            opts={{
              align: 'center',
              loop: true,
              skipSnaps: false,
              dragFree: false,
              watchDrag: !isZoomed, // Disable drag when zoomed
            }}
          >
            <CarouselContent className={cn(
              "h-full -ml-4",
              isZoomed && "overflow-visible"
            )}>
              {images.map((asset, index) => {
                const builtImage = urlForImage(asset.image, { maxWidth: 2000 })
                if (!builtImage) return null

                const alt = asset.image?.alt || asset.portfolioMetadata?.projectName || asset.title || 'Portfolio image'
                const isCurrentSlide = index === current

                return (
                  <CarouselItem 
                    key={asset._id} 
                    className={cn(
                      "h-full pl-4 basis-full flex items-center justify-center",
                      isZoomed && isCurrentSlide && "z-50 overflow-visible"
                    )}
                  >
                    <div 
                      className={cn(
                        "relative w-full h-[70vh] transition-all duration-300 ease-out",
                        isZoomed && isCurrentSlide ? "scale-150 cursor-zoom-out z-50" : "scale-100 cursor-zoom-in"
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsZoomed(!isZoomed)
                      }}
                      style={{
                        transformOrigin: 'center center',
                      }}
                    >
                      <Image
                        src={builtImage.src}
                        alt={alt}
                        fill
                        className="object-contain pointer-events-none select-none"
                        sizes="95vw"
                        priority={index === initialIndex}
                        loading={index === initialIndex ? 'eager' : 'lazy'}
                        placeholder={builtImage.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={builtImage.blurDataURL || undefined}
                        draggable={false}
                      />
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            
            {/* Custom Navigation Buttons - z-index higher than zoomed images */}
            <CarouselPrevious className="left-4 h-12 w-12 border-2 border-white/30 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white hover:text-white disabled:opacity-30 z-[60]" />
            <CarouselNext className="right-4 h-12 w-12 border-2 border-white/30 bg-black/40 backdrop-blur-md hover:bg-black/60 text-white hover:text-white disabled:opacity-30 z-[60]" />
          </Carousel>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {isFeatured && (
                <Badge className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 border-0">
                  ⭐ Featured
                </Badge>
              )}
              {scene && (
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-white/20 capitalize">
                  <Tag className="w-3 h-3 mr-1" />
                  {scene.replace(/-/g, ' ')}
                </Badge>
              )}
              {style && (
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-white/20 capitalize">
                  <Maximize2 className="w-3 h-3 mr-1" />
                  {style.replace(/-/g, ' ')}
                </Badge>
              )}
            </div>
            
            {/* Keyboard hints */}
            <div className="text-xs text-gray-400 hidden md:flex gap-3 items-center">
              <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">←</kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">→</kbd>
              <span>Navigate</span>
              <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">Z</kbd>
              <span>Zoom</span>
              <kbd className="px-2 py-1 bg-white/10 rounded border border-white/20">ESC</kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
