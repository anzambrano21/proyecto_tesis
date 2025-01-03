'use client'

import * as React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const images = [
  { src: "https://imgs.search.brave.com/zA60Sd-DcT48sGtFj12WQrNfdsyl2Lr8_WnqAJ5PEJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzgxNU50WUlrNElM/LmpwZw", alt: "Image 1" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Image 2" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Image 3" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Image 4" },
  { src: "/placeholder.svg?height=400&width=600", alt: "Image 5" },
]

export function ImageCarousel() {
  return (
    <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

