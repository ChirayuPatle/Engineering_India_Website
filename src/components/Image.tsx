"use client";

import React from "react";
import { IKImage } from "imagekitio-next";
import { env } from "@/env";

const urlEndpoint = env.NEXT_PUBLIC_URL_ENDPOINT;

const Image = (props: any) => {
  return <IKImage urlEndpoint={urlEndpoint} {...props} />;
};

export default Image;
