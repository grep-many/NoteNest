import React, { useState } from 'react';
;
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthModal = ({ closeDialog, tab }) => {

    const [activeTab, setActiveTab] = useState(tab?tab:'signin');

    return (
        <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={e => setActiveTab(e)}
            className="w-full max-w-sm"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <SignInForm closeDialog={closeDialog} />
            </TabsContent>
            <TabsContent value="signup">
                <SignUpForm closeDialog={closeDialog} />
            </TabsContent>
        </Tabs>
    );
}

export default AuthModal;
