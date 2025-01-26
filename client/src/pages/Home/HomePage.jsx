import CTASection from '@/components/section/CTASection';
import FeatureSection from '@/components/section/FeatureSection';
import HeroSection from '@/components/section/HeroSection';
import HowItWorksSection from '@/components/section/HowItWorks';
import TestimonialSection from '@/components/section/TestimonialSection';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const HomePage = () => {

    return (
        <>
            <HeroSection />
            <Separator />
            <FeatureSection />
            <Separator />
            <HowItWorksSection />
            <Separator />
            <TestimonialSection />
            <Separator />
            <CTASection />
        </>
    );
}

export default HomePage;
