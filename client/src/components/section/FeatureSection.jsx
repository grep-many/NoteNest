import React from 'react';
import { Card } from '../ui/card'; // Import Card component from ShadCN
import { assets } from '@/assets/assets';

const FeatureSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Features of <strong>NoteNest</strong></h2>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
            <img src={assets.feature1} alt="Feature 1" className="w-full h-full mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-4">Task Management</h3>
            <p className="mb-4">
              Easily organize, prioritize, and track your tasks with NoteNest's intuitive task manager.
            </p>
            {/* Bullet Points for Feature 1 */}
            <ul className="text-left">
              <li>Prioritize tasks based on urgency</li>
              <li>Track your progress in real-time</li>
              <li>Set reminders to stay on top of deadlines</li>
            </ul>
          </Card>

          {/* Feature 2 */}
          <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
            <img src={assets.feature2} alt="Feature 2" className="w-full h-full mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-4">Notes & Reminders</h3>
            <p className="mb-4">
              Capture your thoughts and set reminders to stay on top of your tasks and deadlines.
            </p>
            {/* Bullet Points for Feature 2 */}
            <ul className="text-left">
              <li>Store all your notes in one place</li>
              <li>Get notifications for your reminders</li>
              <li>Easy to organize with tags</li>
            </ul>
          </Card>

          {/* Feature 3 */}
          <Card className="shadow-lg p-6 flex flex-col items-center justify-between">
            <img src={assets.feature3} alt="Feature 3" className="w-full h-full mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-4">Sync Across Devices</h3>
            <p className="mb-4">
              Seamlessly sync your tasks and notes across all your devices for a truly connected experience.
            </p>
            {/* Bullet Points for Feature 3 */}
            <ul className="text-left">
              <li>Access your tasks and notes from any device</li>
              <li>Sync in real-time for up-to-date information</li>
              <li>Works across web, mobile, and desktop</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
