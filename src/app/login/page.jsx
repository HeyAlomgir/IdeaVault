"use client"
import { authClient } from "@/lib/auth-client";

import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";


const Login = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const fromData = new FormData(e.currentTarget);
        const user = Object.fromEntries(fromData.entries());
        // console.log(user);
        const { data, error } = await authClient.signIn.email({

            email: user?.email,
            password: user?.password,
        })
        console.log({ data, error });

        if (data) {
            redirect("/")
        }
        if(error){
            toast.error("Login Faild!")
        }
    }

    const handelGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        toast.success("sign in successfully!")
    }


    return (
        <div className="my-5">
            <div className="flex flex-col items-center my-5">
                <h1 className="text-cyan-800 font-extrabold text-3xl">Login</h1>
                <p className="text-gray-400">Start your adventure with Idyavault</p>
            </div>

            <Card className="max-w-md mx-auto border">
                <Form
                    onSubmit={onSubmit}
                    className="flex  flex-col gap-4 "
                    render={(props) => <form {...props} data-custom="foo" />}

                >



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
                        <Button type="submit" className={" w-full"}  >
                            
                            Login
                        </Button>

                    </div>
                </Form>

                <div className="flex justify-center items-center gap-3">
                    <Separator />
                    <div className="whitespace-nowrap">Or sign up with</div>
                    <Separator />
                </div>

                <div>
                    <Button onClick={handelGoogleSignIn} variant="outline" className={"w-full rounded-none"}> <FcGoogle /> SignIn with Google</Button>
                </div>



            </Card>

        </div>
    );
};

export default Login;