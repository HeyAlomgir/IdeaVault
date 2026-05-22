"use client"
import { authClient } from "@/lib/auth-client";

import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";



const SignUP = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const fromData = new FormData(e.currentTarget);
        const user = Object.fromEntries(fromData.entries());
        // console.log(user);
        const { data, error } = await authClient.signUp.email({
            name: user?.name,
            email: user?.email,
            password: user?.password,
            image: user?.image,
        })
        console.log({ data, error });

        if (data) {
            redirect("/")
        }
        if(error){
            toast.error("Register faild !")
        }
    }


    const handelGoogleSignUp = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            
        });
        toast.success("sign up successfully!")
    }


    return (
        <div className="my-5">
            <div className="flex flex-col items-center my-5">
                <h1 className="text-cyan-800 font-extrabold text-3xl">Create Account</h1>
                <p className="text-gray-400">Start your adventure with Idyavault</p>
            </div>

            <Card className="max-w-md mx-auto border">
                <Form
                    onSubmit={onSubmit}
                    className="flex  flex-col gap-4 "
                    render={(props) => <form {...props} data-custom="foo" />}

                >
                    <TextField
                        
                        name="name"
                        type="text"

                    >
                        <Label>Email</Label>
                        <Input placeholder="Enter Your Name" />
                        <FieldError />
                    </TextField>

                    <TextField
                        
                        name="image"
                        type="url"
                    >
                        <Label>Image</Label>
                        <Input placeholder="img url" />
                        <FieldError />
                    </TextField>


                    <TextField
                        
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField
                        
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            } 
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button type="submit" className={" w-full rounded-none"}  >

                            Create Account
                        </Button>

                    </div>
                </Form>

                <div className="flex justify-center items-center gap-3">
                    <Separator />
                    <div className="whitespace-nowrap">Or sign up with</div>
                    <Separator />
                </div>

                <div>
                    <Button onClick={handelGoogleSignUp} variant="outline" className={"w-full rounded-none"}> <FcGoogle /> SignUp with Google</Button>
                </div>



            </Card>

        </div>
    );
};

export default SignUP;