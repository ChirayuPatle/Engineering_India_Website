"use client";

import React, { ComponentProps } from "react";
import { IKImage } from "imagekitio-next";
import { env } from "@/env";

const urlEndpoint = env.NEXT_PUBLIC_URL_ENDPOINT;

const Image = (props: ComponentProps<typeof IKImage>) => {
  return <IKImage urlEndpoint={urlEndpoint} {...props} />;
};

export default Image;
