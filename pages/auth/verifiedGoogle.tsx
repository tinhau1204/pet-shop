import { Button, Flex, Paper, Text } from "@mantine/core";
import React from "react";
import MonitoIcon from "@my-images/monito.svg";
import LinkIcon from "@my-images/Link.svg";

export default function verifiedSignUp() {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="h-fit p-8 border border-black-bold/5 w-fit m-auto rounded-xl shadow-lg">
                <div className="flex flex-col justify-center items-start gap-2">
                    <h2 className="text-black-bold text-3xl font-bold mt-4">
                        Congratulations!
                    </h2>
                    <p className="text-black-bold text-sm font-normal">
                        Your Google account has been linked to our Monito
                        account.
                    </p>

                    <div className="flex flex-row justify-start items-center gap-2 py-4 px-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                        >
                            <path
                                fill="#FFC107"
                                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                            />
                            <path
                                fill="#FF3D00"
                                d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                            />
                        </svg>
                        <LinkIcon className="text-green-normal" />
                        <MonitoIcon />
                    </div>

                    <button
                        className="bg-blue-medium text-primary font-semibold text-base px-5 py-2 rounded"
                        onClick={() => console.log("go to Login ")}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
