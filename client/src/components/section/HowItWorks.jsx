import React from 'react';
import { Card } from '../ui/card'; // Import Card component from ShadCN

const HowItWorksSection = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">How <strong>NoteNest</strong> Works</h2>

                {/* Steps Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
                        <h3 className="text-xl font-semibold mb-4">Step 1: Add a Task</h3>
                        <p className="mb-4">
                            Start by adding a task or note in the NoteNest app. Whether it’s something simple or complex, get it all in one place.
                        </p>
                    </Card>

                    {/* Step 2 */}
                    <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
                        <h3 className="text-xl font-semibold mb-4">Step 2: Organize and Prioritize</h3>
                        <p className="mb-4">
                            Organize your tasks by priority, due dates, or categories. Prioritize your tasks to stay focused and productive.
                        </p>
                    </Card>

                    {/* Step 3 */}
                    <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
                        <h3 className="text-xl font-semibold mb-4">Step 3: Set Reminders</h3>
                        <p className="mb-4">
                            Set custom reminders to ensure you never forget an important task. Get notified right when you need to take action.
                        </p>
                    </Card>

                    {/* Step 4 */}
                    <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
                        <h3 className="text-xl font-semibold mb-4">Step 4: Sync Across Devices</h3>
                        <p className="mb-4">
                            Access your tasks and notes from any device and sync everything in real time across all your devices.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;