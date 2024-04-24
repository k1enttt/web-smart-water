import React from "react";
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import { Header } from "./header";

interface CardWrapperProps {
    children: React.ReactNode;
    title: string;
}

const CardWrapper = ({ children, title }: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={title} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default CardWrapper;
