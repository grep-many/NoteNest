import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import StarRating from './RatingInput';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addFeedbackService } from '@/services/feedbackService';
import { usePage } from '@/context/PageProvider';

const FeedbackModal = ({ isDialogOpen, setIsDialogOpen }) => {

    const [rating, setRating] = React.useState(0);
    const [review, setReview] = React.useState("");
    const {auth,toast} = usePage();

    const validateFeedbackForm = () => {
        return (
            review !== "" &&
            rating
        );
    }

    const handleSubmit = async () => {
        const response = await addFeedbackService({
            name:auth?.user?.name,
            rating,
            review,
        });

        if (response?.status === 201) {
            toast({
                description: "Submitted Feeback!",
            });
            setRating(0);
            setReview("");
            setIsDialogOpen(false)
        }else{
            toast({
                variant: "destructive",
                title: "Something went wrong while submitting Feeback!",
            });
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="justify-center backdrop-blur-md shadow bg-transparent">
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription>write a feedback to improve us!</DialogDescription>
                </DialogHeader>
                <Card className="p-6 space-y-6">
                    <StarRating value={rating} onChange={setRating} />
                    <Textarea
                        rows={8}
                        className="resize-none"
                        placeholder="Enter your review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <Button
                            disabled={!validateFeedbackForm()}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

export default FeedbackModal;
