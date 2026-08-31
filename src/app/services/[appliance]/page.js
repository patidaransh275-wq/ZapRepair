import React from 'react';
import { notFound } from 'next/navigation';
import { SERVICES_DATA } from '../../../data/servicesData';
import ServiceDetailPageClient from '../../../components/services/ServiceDetailPageClient';

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    appliance: service.slug
  }));
}

export function generateMetadata({ params }) {
  const { appliance } = params;
  const service = SERVICES_DATA.find((s) => s.slug === appliance || s.id === appliance);

  if (!service) {
    return {
      title: 'Service Not Found | PlumberIndore',
      description: 'Requested repair service not found.'
    };
  }

  const title = `${service.name} in Indore | 45-Min Doorstep Repair & Service`;
  const description = `Book certified ${service.name} at your doorstep in Indore. 45-minute technician arrival, 30-day post service warranty, genuine spare parts, and fixed transparent pricing across Vijay Nagar, Palasia & all areas.`;

  return {
    title: title,
    description: description,
    keywords: [
      `${service.name} Indore`,
      `${service.name} Vijay Nagar`,
      `${service.name} Palasia`,
      `${service.name} repair cost Indore`,
      `doorstep ${service.name} Indore`,
      `best ${service.name} in Indore`
    ],
    alternates: {
      canonical: `https://www.plumberindore.in/services/${service.slug}`
    },
    openGraph: {
      title: `${title} | PlumberIndore`,
      description: description,
      url: `https://www.plumberindore.in/services/${service.slug}`,
      siteName: 'PlumberIndore',
      images: [
        {
          url: service.bannerImage,
          width: 800,
          height: 600,
          alt: `${service.name} in Indore`
        }
      ],
      locale: 'en_IN',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | PlumberIndore`,
      description: description,
      images: [service.bannerImage]
    }
  };
}

export default function ServiceDetailPage({ params }) {
  const { appliance } = params;
  const service = SERVICES_DATA.find((s) => s.slug === appliance || s.id === appliance);

  if (!service) {
    notFound();
  }

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': service.name,
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'PlumberIndore',
      'telephone': '+91-9174934135',
      'email': 'plumberindore@gmail.com',
      'priceRange': '₹₹',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Indore',
        'addressRegion': 'Madhya Pradesh',
        'postalCode': '452010',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 22.7533,
        'longitude': 75.8937
      }
    },
    'areaServed': {
      '@type': 'City',
      'name': 'Indore'
    },
    'description': service.description,
    'offers': {
      '@type': 'Offer',
      'price': service.startingPrice,
      'priceCurrency': 'INR'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <ServiceDetailPageClient service={service} />
    </>
  );
}
