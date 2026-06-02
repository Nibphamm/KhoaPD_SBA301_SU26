import React, { useState } from 'react';
import { Carousel as RBCarousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { banners } from '../data/banner';

export default function BannerCarousel({ imageFiles = banners }) {
    const images = imageFiles.map(f => `/images/${f}`)
    const [index, setIndex] = useState(0)

    return (
        <div className="banner-wrap my-4">
            <RBCarousel activeIndex={index} onSelect={setIndex} fade interval={3000}>
                {images.map((src, i) => (
                    <RBCarousel.Item key={i}>
                        <img className="d-block w-100 banner-img rounded shadow-sm" src={src} alt={`Slide ${i + 1}`} style={{ height: '450px', objectFit: 'cover' }} />
                    </RBCarousel.Item>
                ))}
            </RBCarousel>
        </div>
    )
}