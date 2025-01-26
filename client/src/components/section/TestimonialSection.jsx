import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming Avatar component from ShadCN
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getFeedbackService } from '@/services/feedbackService';
import { usePage } from '@/context/PageProvider';
import { Star } from 'lucide-react';

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = React.useState([]);
    const { toast } = usePage();

    const getFeedback = async () => {
        const response = await getFeedbackService();

        if (response?.status === 200) {
            setTestimonials(response?.data);
        } else {
            toast({
                variant: "destructive",
                title: "Something went wrong while fetching testimonials!",
            });
        }
    };

    React.useEffect(() => {
        getFeedback();
    }, []);

    if (testimonials.length > 0) {

        return (
            <section className="p-16">
                <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
                <div className="container text-center">
                    <Carousel className="w-full max-w-100 mx-auto">
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem
                                    key={index}
                                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
                                            {/* Avatar component for the user's photo */}
                                            <Avatar className="h-[100px] w-[100px] rounded-lg">
                                                <AvatarImage src={testimonial?.avatar} alt={testimonial?.name} />
                                                <AvatarFallback className="rounded-lg text-6xl font-bold">
                                                    {testimonial?.name.split(" ")[0].charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <h3 className="text-xl font-semibold mb-4">
                                                {testimonial?.name.charAt(0).toUpperCase() + testimonial?.name.slice(1).toLowerCase()}
                                            </h3>
                                            <p className="mb-4">{testimonial?.review}</p>

                                            {/* Star rating */}
                                            <div className="flex space-x-1 mb-4">
                                                {[1, 2, 3, 4, 5].map((starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        size={20}
                                                        fill={starIndex <= testimonial?.rating ? "yellow" : "none"}
                                                    />
                                                ))}
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
        );
    }
};

export default TestimonialSection;
