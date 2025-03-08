"use client";

import { useEffect } from "react";
import AboutSection from "@/components/landing/aboutSection";
import Container from "@/components/landing/container";
import EventsGallery from "@/components/landing/eventGallery";
import Faq from "@/components/landing/faq";
import Feedback from "@/components/landing/feedback";
import Section from "@/components/landing/section";
import FeatureCarousel from "@/components/ui/FeatureCarousel";
import Timeline from "@/components/ui/Timeline";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ArrowRight, Building, Rocket, Users } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  useEffect(() => {
    if (!sessionStorage.getItem("animationPlayed")) {
      gsap.from(".header-letter", {
        y: 100,
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
      });

      gsap.from([".subtitle", ".cta-button"], {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 3,
        ease: "power2.out",
      });

      gsap.from(".stat-item", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 1,
        ease: "power2.out",
        stagger: 0.2,
      });

      gsap.from(".trusted-by", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
      });

      sessionStorage.setItem("animationPlayed", "true");
    }
  }, []);

  useEffect(() => {
    const handleRefresh = () => {
      // Remove animation flag on page refresh
      sessionStorage.removeItem("animationPlayed");
    };

    window.addEventListener("beforeunload", handleRefresh);
    return () => window.removeEventListener("beforeunload", handleRefresh);
  }, []);

useEffect(() => {



  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
      ease: "power3",
    });
    gsap.to(follower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
      ease: "power1.out",
    });
  });

  gsap.to(".circle",{
    rotate: 360,
    repeat: -1,
    duration: 5,
    // yoyo:true,
    ease:"none"
  })

  return () => {
    // Cleanup to prevent GSAP memory leaks
    gsap.killTweensOf(cursor);
    gsap.killTweensOf(follower);
  };
}, []);

 

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: any) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy(); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="cursor pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 rounded-full bg-white mix-blend-difference lg:block"></div>

      <Section className="relative min-h-screen pb-16 pt-32 ">
      <div className="min-h-screen w-full absolute top-0 bg-transparent z-0 ">
      
      {/* upper - part */}
      <div className="relative  h-72 w-96 z-0">
   <div className="h-32 scale-50 lg:scale-100 w-32 absolute z-10 top-24 right-32 lg:right-16  ">
   <img className="circle" src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjE0MyIgdmlld0JveD0iMCAwIDE0MyAxNDMiIHdpZHRoPSIxNDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTEyNi4xIDExNC0xMy45LTMuOWMtMi41LS43LTQuOSAxLjUtNC4zIDQuMWwzLjEgMTQuMWMuNyAzLjItMyA1LjUtNS41IDMuNWwtMTEuNC04LjljLTIuMS0xLjYtNS4xLS41LTUuNSAyLjFsLTIuNiAxNC4zYy0uNiAzLjItNC44IDMuOS02LjQgMS4xbC03LjEtMTIuNmMtMS4zLTIuMy00LjUtMi40LTUuOS0uMmwtNy44IDEyLjJjLTEuNyAyLjctNiAxLjgtNi40LTEuNGwtMS43LTE0LjRjLS4zLTIuNi0zLjMtMy45LTUuNC0yLjRsLTExLjggOC4zYy0yLjcgMS45LTYuMi0uNi01LjMtMy44bDMuOS0xMy45Yy43LTIuNS0xLjUtNC45LTQuMS00LjNsLTE0LjIgMy4xYy0zLjIuNy01LjQ5OTk4LTMtMy41LTUuNWw4LjktMTEuNGMxLjYtMi4xLjUtNS4xLTIuMS01LjVsLTE0LjE5OTk4LTIuNmMtMy4yMDAwMDQtLjYtMy45MDAwMDUtNC44LTEuMS02LjRsMTIuNTk5OTgtNy4xYzIuMy0xLjMgMi40LTQuNS4yLTUuOWwtMTIuMjk5OTgtNy44Yy0yLjcwMDAwNS0xLjctMS44MDAwMDUtNiAxLjQtNi40bDE0LjM5OTk4LTEuN2MyLjYtLjMgMy45LTMuMyAyLjQtNS40bC04LjMtMTEuOGMtMS45LTIuNy42LTYuMiAzLjgtNS4zbDEzLjkgMy44YzIuNS43IDQuOS0xLjUgNC4zLTQuMWwtMy4xLTE0LjFjLS43LTMuMiAzLTUuNDk5OTggNS41LTMuNWwxMS40IDguOWMyLjEgMS42IDUuMS41IDUuNS0yLjFsMi41LTE0LjE5OTk4Yy42LTMuMjAwMDA0IDQuOC0zLjkwMDAwNSA2LjQtMS4xbDcuMSAxMi41OTk5OGMxLjMgMi4zIDQuNSAyLjQgNS45LjJsNy44LTEyLjE5OTk4YzEuNy0yLjcwMDAwNCA2LTEuODAwMDA1IDYuNCAxLjRsMS43IDE0LjM5OTk4Yy4zIDIuNiAzLjMgMy45IDUuNCAyLjRsMTEuOC04LjNjMi43LTEuOSA2LjIuNiA1LjMgMy44bC0zLjkgMTMuOWMtLjcgMi41IDEuNSA0LjkgNC4xIDQuM2wxNC4xLTMuMWMzLjItLjcgNS41IDMgMy41IDUuNWwtOC43IDExLjNjLTEuNiAyLjEtLjUgNS4xIDIuMSA1LjVsMTQuMiAyLjVjMy4yLjYgMy45IDQuOCAxLjEgNi40bC0xMi42IDcuMWMtMi4zIDEuMy0yLjQgNC41LS4yIDUuOWwxMi4yIDcuOGMyLjcgMS43IDEuOCA2LTEuNCA2LjRsLTE0LjMgMS44Yy0yLjYuMy0zLjkgMy4zLTIuNCA1LjRsOC4zIDExLjhjMS44IDIuOC0uNyA2LjMtMy44IDUuNHoiIGZpbGw9IiNmMGVhY2YiLz48L3N2Zz4=" alt="" />
    </div>  
    <div className="absolute z-0 scale-[70%] lg:scale-100  ">
    <img className="circle" src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjIwNCIgdmlld0JveD0iMCAwIDIwNCAyMDQiIHdpZHRoPSIyMDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTE4MS4wODYgMTYzLjU4Ny0xOS45NjktNS41OThjLTMuNTkyLTEuMDA1LTcuMDQgMi4xNTMtNi4xNzggNS44ODZsNC40NTQgMjAuMjQyYzEuMDA1IDQuNTk0LTQuMzEgNy44OTUtNy45MDIgNS4wMjRsLTE2LjM3Ny0xMi43NzdjLTMuMDE3LTIuMjk3LTcuMzI3LS43MTctNy45MDEgMy4wMTVsLTMuNzM2IDIwLjUyOWMtLjg2MiA0LjU5NC02Ljg5NSA1LjU5OS05LjE5NCAxLjU3OWwtMTAuMi0xOC4wODhjLTEuODY4LTMuMzAyLTYuNDY0Ny0zLjQ0Ni04LjQ3Ni0uMjg3bC0xMS4yMDU1IDE3LjUxNGMtMi40NDIzIDMuODc2LTguNjE5NyAyLjU4NC05LjE5NDQtMi4wMWwtMi40NDIyLTIwLjY3M2MtLjQzMS0zLjczMi00Ljc0MDktNS41OTgtNy43NTc4LTMuNDQ1bC0xNi45NTIgMTEuOTE2Yy0zLjg3ODkgMi43MjctOC45MDctLjg2Mi03LjYxNDEtNS40NTZsNS42MDI4LTE5Ljk1NWMxLjAwNTctMy41ODktMi4xNTQ5LTcuMDM0LTUuODkwMS02LjE3M2wtMjAuMzk5OSA0LjQ1MWMtNC41OTcyIDEuMDA1LTcuOTAxNC00LjMwNy01LjAyODItNy44OTZsMTIuNzg1OS0xNi4zNjZjMi4yOTg2LTMuMDE1LjcxODMtNy4zMjItMy4wMTY5LTcuODk2bC0yMC4zOTk5NC0zLjczMmMtNC41OTcxNzItLjg2Mi01LjYwMjgtNi44OTEtMS41ODAyOC05LjE4OGwxOC4xMDEzMi0xMC4xOTNjMy4zMDQyLTEuODY2IDMuNDQ3OS02LjQ2MDQuMjg3NC04LjQ3MDJsLTE3LjY3MDQxLTExLjE5NzdjLTMuODc4ODY0LTIuNDQwNi0yLjU4NTkxLTguNjEzNyAyLjAxMTI2LTkuMTg3OWwyMC42ODcyNS0yLjQ0MDVjMy43MzUyLS40MzA3IDUuNjAyOC00LjczNzUgMy40NDc5LTcuNzUyM2wtMTEuOTIzOS0xNi45NDAxYy0yLjcyOTYtMy44NzYyLjg2MTktOC45MDA4IDUuNDU5MS03LjYwODdsMTkuOTY5IDUuNDU1M2MzLjU5MTUgMS4wMDQ5IDcuMDM5NC0yLjE1MzQgNi4xNzc0LTUuODg2bC00LjQ1MzUtMjAuMjQyYy0xLjAwNTYtNC41OTQgNC4zMDk5LTcuODk1OSA3LjkwMTQtNS4wMjQ3bDE2LjM3NzQgMTIuNzc2OWMzLjAxNjkgMi4yOTcgNy4zMjY3LjcxNzggNy45MDE0LTMuMDE0N2wzLjU5MTUtMjAuMzg1NjJjLjg2Mi00LjU5MzkzOSA2Ljg5NTgtNS41OTg4NiA5LjE5NDQtMS41NzkxN2wxMC4xOTk5IDE4LjA4ODU5YzEuODY3OCAzLjMwMTkgNi40NjQ4IDMuNDQ1NSA4LjQ3NTguMjg3MWwxMS4yMDYtMTcuNTE0MzNjMi40NDItMy44NzYxMjkgOC42Mi0yLjU4NDA4NSA5LjE5NCAyLjAwOTg1bDIuNDQyIDIwLjY3MjY4Yy40MzEgMy43MzI2IDQuNzQxIDUuNTk4OSA3Ljc1OCAzLjQ0NTVsMTYuOTUyLTExLjkxNTVjMy44NzktMi43Mjc3IDguOTA3Ljg2MTMgNy42MTQgNS40NTUzbC01LjYwMyAxOS45NTQ5Yy0xLjAwNSAzLjU4OSAyLjE1NSA3LjAzNDQgNS44OTEgNi4xNzMxbDIwLjI1Ni00LjQ1MDRjNC41OTctMS4wMDQ5IDcuOTAxIDQuMzA2OCA1LjAyOCA3Ljg5NThsLTEyLjQ5OSAxNi4yMjIzYy0yLjI5OCAzLjAxNDgtLjcxOCA3LjMyMTYgMy4wMTcgNy44OTU5bDIwLjQgMy41ODljNC41OTcuODYxMyA1LjYwMyA2Ljg5MDkgMS41ODEgOS4xODc4bC0xOC4xMDIgMTAuMTkyOGMtMy4zMDQgMS44NjYtMy40NDggNi40Ni0uMjg3IDguNDdsMTcuNTI3IDExLjE5OGMzLjg3OCAyLjQ0IDIuNTg2IDguNjEzLTIuMDEyIDkuMTg4bC0yMC41NDMgMi41ODRjLTMuNzM1LjQzLTUuNjAzIDQuNzM3LTMuNDQ4IDcuNzUybDExLjkyNCAxNi45NGMyLjU4NiA0LjAyLTEuMDA2IDkuMDQ0LTUuNDU5IDcuNzUyeiIgZmlsbD0iIzgxYTJlZiIvPjwvc3ZnPg==" alt="" />
    </div>  
      </div>
     {/* uppper - part end  */}
      <div className="relative scale-50 md:scale-100  md:right-0 -right-20  h-72 w-full z-0">
   <div className="h-32  w-32 absolute z-10 top-48 right-32  ">
   <img className="circle" src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjE0MyIgdmlld0JveD0iMCAwIDE0MyAxNDMiIHdpZHRoPSIxNDMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTEyNi4xIDExNC0xMy45LTMuOWMtMi41LS43LTQuOSAxLjUtNC4zIDQuMWwzLjEgMTQuMWMuNyAzLjItMyA1LjUtNS41IDMuNWwtMTEuNC04LjljLTIuMS0xLjYtNS4xLS41LTUuNSAyLjFsLTIuNiAxNC4zYy0uNiAzLjItNC44IDMuOS02LjQgMS4xbC03LjEtMTIuNmMtMS4zLTIuMy00LjUtMi40LTUuOS0uMmwtNy44IDEyLjJjLTEuNyAyLjctNiAxLjgtNi40LTEuNGwtMS43LTE0LjRjLS4zLTIuNi0zLjMtMy45LTUuNC0yLjRsLTExLjggOC4zYy0yLjcgMS45LTYuMi0uNi01LjMtMy44bDMuOS0xMy45Yy43LTIuNS0xLjUtNC45LTQuMS00LjNsLTE0LjIgMy4xYy0zLjIuNy01LjQ5OTk4LTMtMy41LTUuNWw4LjktMTEuNGMxLjYtMi4xLjUtNS4xLTIuMS01LjVsLTE0LjE5OTk4LTIuNmMtMy4yMDAwMDQtLjYtMy45MDAwMDUtNC44LTEuMS02LjRsMTIuNTk5OTgtNy4xYzIuMy0xLjMgMi40LTQuNS4yLTUuOWwtMTIuMjk5OTgtNy44Yy0yLjcwMDAwNS0xLjctMS44MDAwMDUtNiAxLjQtNi40bDE0LjM5OTk4LTEuN2MyLjYtLjMgMy45LTMuMyAyLjQtNS40bC04LjMtMTEuOGMtMS45LTIuNy42LTYuMiAzLjgtNS4zbDEzLjkgMy44YzIuNS43IDQuOS0xLjUgNC4zLTQuMWwtMy4xLTE0LjFjLS43LTMuMiAzLTUuNDk5OTggNS41LTMuNWwxMS40IDguOWMyLjEgMS42IDUuMS41IDUuNS0yLjFsMi41LTE0LjE5OTk4Yy42LTMuMjAwMDA0IDQuOC0zLjkwMDAwNSA2LjQtMS4xbDcuMSAxMi41OTk5OGMxLjMgMi4zIDQuNSAyLjQgNS45LjJsNy44LTEyLjE5OTk4YzEuNy0yLjcwMDAwNCA2LTEuODAwMDA1IDYuNCAxLjRsMS43IDE0LjM5OTk4Yy4zIDIuNiAzLjMgMy45IDUuNCAyLjRsMTEuOC04LjNjMi43LTEuOSA2LjIuNiA1LjMgMy44bC0zLjkgMTMuOWMtLjcgMi41IDEuNSA0LjkgNC4xIDQuM2wxNC4xLTMuMWMzLjItLjcgNS41IDMgMy41IDUuNWwtOC43IDExLjNjLTEuNiAyLjEtLjUgNS4xIDIuMSA1LjVsMTQuMiAyLjVjMy4yLjYgMy45IDQuOCAxLjEgNi40bC0xMi42IDcuMWMtMi4zIDEuMy0yLjQgNC41LS4yIDUuOWwxMi4yIDcuOGMyLjcgMS43IDEuOCA2LTEuNCA2LjRsLTE0LjMgMS44Yy0yLjYuMy0zLjkgMy4zLTIuNCA1LjRsOC4zIDExLjhjMS44IDIuOC0uNyA2LjMtMy44IDUuNHoiIGZpbGw9IiNmMGVhY2YiLz48L3N2Zz4=" alt="" />
    </div>  
    <div className="absolute right-0 z-0  ">
    <img className="circle" src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjIwNCIgdmlld0JveD0iMCAwIDIwNCAyMDQiIHdpZHRoPSIyMDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTE4MS4wODYgMTYzLjU4Ny0xOS45NjktNS41OThjLTMuNTkyLTEuMDA1LTcuMDQgMi4xNTMtNi4xNzggNS44ODZsNC40NTQgMjAuMjQyYzEuMDA1IDQuNTk0LTQuMzEgNy44OTUtNy45MDIgNS4wMjRsLTE2LjM3Ny0xMi43NzdjLTMuMDE3LTIuMjk3LTcuMzI3LS43MTctNy45MDEgMy4wMTVsLTMuNzM2IDIwLjUyOWMtLjg2MiA0LjU5NC02Ljg5NSA1LjU5OS05LjE5NCAxLjU3OWwtMTAuMi0xOC4wODhjLTEuODY4LTMuMzAyLTYuNDY0Ny0zLjQ0Ni04LjQ3Ni0uMjg3bC0xMS4yMDU1IDE3LjUxNGMtMi40NDIzIDMuODc2LTguNjE5NyAyLjU4NC05LjE5NDQtMi4wMWwtMi40NDIyLTIwLjY3M2MtLjQzMS0zLjczMi00Ljc0MDktNS41OTgtNy43NTc4LTMuNDQ1bC0xNi45NTIgMTEuOTE2Yy0zLjg3ODkgMi43MjctOC45MDctLjg2Mi03LjYxNDEtNS40NTZsNS42MDI4LTE5Ljk1NWMxLjAwNTctMy41ODktMi4xNTQ5LTcuMDM0LTUuODkwMS02LjE3M2wtMjAuMzk5OSA0LjQ1MWMtNC41OTcyIDEuMDA1LTcuOTAxNC00LjMwNy01LjAyODItNy44OTZsMTIuNzg1OS0xNi4zNjZjMi4yOTg2LTMuMDE1LjcxODMtNy4zMjItMy4wMTY5LTcuODk2bC0yMC4zOTk5NC0zLjczMmMtNC41OTcxNzItLjg2Mi01LjYwMjgtNi44OTEtMS41ODAyOC05LjE4OGwxOC4xMDEzMi0xMC4xOTNjMy4zMDQyLTEuODY2IDMuNDQ3OS02LjQ2MDQuMjg3NC04LjQ3MDJsLTE3LjY3MDQxLTExLjE5NzdjLTMuODc4ODY0LTIuNDQwNi0yLjU4NTkxLTguNjEzNyAyLjAxMTI2LTkuMTg3OWwyMC42ODcyNS0yLjQ0MDVjMy43MzUyLS40MzA3IDUuNjAyOC00LjczNzUgMy40NDc5LTcuNzUyM2wtMTEuOTIzOS0xNi45NDAxYy0yLjcyOTYtMy44NzYyLjg2MTktOC45MDA4IDUuNDU5MS03LjYwODdsMTkuOTY5IDUuNDU1M2MzLjU5MTUgMS4wMDQ5IDcuMDM5NC0yLjE1MzQgNi4xNzc0LTUuODg2bC00LjQ1MzUtMjAuMjQyYy0xLjAwNTYtNC41OTQgNC4zMDk5LTcuODk1OSA3LjkwMTQtNS4wMjQ3bDE2LjM3NzQgMTIuNzc2OWMzLjAxNjkgMi4yOTcgNy4zMjY3LjcxNzggNy45MDE0LTMuMDE0N2wzLjU5MTUtMjAuMzg1NjJjLjg2Mi00LjU5MzkzOSA2Ljg5NTgtNS41OTg4NiA5LjE5NDQtMS41NzkxN2wxMC4xOTk5IDE4LjA4ODU5YzEuODY3OCAzLjMwMTkgNi40NjQ4IDMuNDQ1NSA4LjQ3NTguMjg3MWwxMS4yMDYtMTcuNTE0MzNjMi40NDItMy44NzYxMjkgOC42Mi0yLjU4NDA4NSA5LjE5NCAyLjAwOTg1bDIuNDQyIDIwLjY3MjY4Yy40MzEgMy43MzI2IDQuNzQxIDUuNTk4OSA3Ljc1OCAzLjQ0NTVsMTYuOTUyLTExLjkxNTVjMy44NzktMi43Mjc3IDguOTA3Ljg2MTMgNy42MTQgNS40NTUzbC01LjYwMyAxOS45NTQ5Yy0xLjAwNSAzLjU4OSAyLjE1NSA3LjAzNDQgNS44OTEgNi4xNzMxbDIwLjI1Ni00LjQ1MDRjNC41OTctMS4wMDQ5IDcuOTAxIDQuMzA2OCA1LjAyOCA3Ljg5NThsLTEyLjQ5OSAxNi4yMjIzYy0yLjI5OCAzLjAxNDgtLjcxOCA3LjMyMTYgMy4wMTcgNy44OTU5bDIwLjQgMy41ODljNC41OTcuODYxMyA1LjYwMyA2Ljg5MDkgMS41ODEgOS4xODc4bC0xOC4xMDIgMTAuMTkyOGMtMy4zMDQgMS44NjYtMy40NDggNi40Ni0uMjg3IDguNDdsMTcuNTI3IDExLjE5OGMzLjg3OCAyLjQ0IDIuNTg2IDguNjEzLTIuMDEyIDkuMTg4bC0yMC41NDMgMi41ODRjLTMuNzM1LjQzLTUuNjAzIDQuNzM3LTMuNDQ4IDcuNzUybDExLjkyNCAxNi45NGMyLjU4NiA0LjAyLTEuMDA2IDkuMDQ0LTUuNDU5IDcuNzUyeiIgZmlsbD0iIzgxYTJlZiIvPjwvc3ZnPg==" alt="" />
    </div>  
      </div>

         </div> 

        <Container className="min-h-screen w-full z-100">
          <div className="z-50 mt-[4rem] flex min-h-screen flex-col items-center justify-center text-center">
            <h1
              className={`${bebasNeue.className} z-50 mb-6 flex gap-2 text-6xl font-extralight text-zinc-700 sm:text-5xl md:text-6xl lg:text-9xl lg:flex-row flex-col `}
            >


            {/* <img src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjIwNCIgdmlld0JveD0iMCAwIDIwNCAyMDQiIHdpZHRoPSIyMDQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTE4MS4wODYgMTYzLjU4Ny0xOS45NjktNS41OThjLTMuNTkyLTEuMDA1LTcuMDQgMi4xNTMtNi4xNzggNS44ODZsNC40NTQgMjAuMjQyYzEuMDA1IDQuNTk0LTQuMzEgNy44OTUtNy45MDIgNS4wMjRsLTE2LjM3Ny0xMi43NzdjLTMuMDE3LTIuMjk3LTcuMzI3LS43MTctNy45MDEgMy4wMTVsLTMuNzM2IDIwLjUyOWMtLjg2MiA0LjU5NC02Ljg5NSA1LjU5OS05LjE5NCAxLjU3OWwtMTAuMi0xOC4wODhjLTEuODY4LTMuMzAyLTYuNDY0Ny0zLjQ0Ni04LjQ3Ni0uMjg3bC0xMS4yMDU1IDE3LjUxNGMtMi40NDIzIDMuODc2LTguNjE5NyAyLjU4NC05LjE5NDQtMi4wMWwtMi40NDIyLTIwLjY3M2MtLjQzMS0zLjczMi00Ljc0MDktNS41OTgtNy43NTc4LTMuNDQ1bC0xNi45NTIgMTEuOTE2Yy0zLjg3ODkgMi43MjctOC45MDctLjg2Mi03LjYxNDEtNS40NTZsNS42MDI4LTE5Ljk1NWMxLjAwNTctMy41ODktMi4xNTQ5LTcuMDM0LTUuODkwMS02LjE3M2wtMjAuMzk5OSA0LjQ1MWMtNC41OTcyIDEuMDA1LTcuOTAxNC00LjMwNy01LjAyODItNy44OTZsMTIuNzg1OS0xNi4zNjZjMi4yOTg2LTMuMDE1LjcxODMtNy4zMjItMy4wMTY5LTcuODk2bC0yMC4zOTk5NC0zLjczMmMtNC41OTcxNzItLjg2Mi01LjYwMjgtNi44OTEtMS41ODAyOC05LjE4OGwxOC4xMDEzMi0xMC4xOTNjMy4zMDQyLTEuODY2IDMuNDQ3OS02LjQ2MDQuMjg3NC04LjQ3MDJsLTE3LjY3MDQxLTExLjE5NzdjLTMuODc4ODY0LTIuNDQwNi0yLjU4NTkxLTguNjEzNyAyLjAxMTI2LTkuMTg3OWwyMC42ODcyNS0yLjQ0MDVjMy43MzUyLS40MzA3IDUuNjAyOC00LjczNzUgMy40NDc5LTcuNzUyM2wtMTEuOTIzOS0xNi45NDAxYy0yLjcyOTYtMy44NzYyLjg2MTktOC45MDA4IDUuNDU5MS03LjYwODdsMTkuOTY5IDUuNDU1M2MzLjU5MTUgMS4wMDQ5IDcuMDM5NC0yLjE1MzQgNi4xNzc0LTUuODg2bC00LjQ1MzUtMjAuMjQyYy0xLjAwNTYtNC41OTQgNC4zMDk5LTcuODk1OSA3LjkwMTQtNS4wMjQ3bDE2LjM3NzQgMTIuNzc2OWMzLjAxNjkgMi4yOTcgNy4zMjY3LjcxNzggNy45MDE0LTMuMDE0N2wzLjU5MTUtMjAuMzg1NjJjLjg2Mi00LjU5MzkzOSA2Ljg5NTgtNS41OTg4NiA5LjE5NDQtMS41NzkxN2wxMC4xOTk5IDE4LjA4ODU5YzEuODY3OCAzLjMwMTkgNi40NjQ4IDMuNDQ1NSA4LjQ3NTguMjg3MWwxMS4yMDYtMTcuNTE0MzNjMi40NDItMy44NzYxMjkgOC42Mi0yLjU4NDA4NSA5LjE5NCAyLjAwOTg1bDIuNDQyIDIwLjY3MjY4Yy40MzEgMy43MzI2IDQuNzQxIDUuNTk4OSA3Ljc1OCAzLjQ0NTVsMTYuOTUyLTExLjkxNTVjMy44NzktMi43Mjc3IDguOTA3Ljg2MTMgNy42MTQgNS40NTUzbC01LjYwMyAxOS45NTQ5Yy0xLjAwNSAzLjU4OSAyLjE1NSA3LjAzNDQgNS44OTEgNi4xNzMxbDIwLjI1Ni00LjQ1MDRjNC41OTctMS4wMDQ5IDcuOTAxIDQuMzA2OCA1LjAyOCA3Ljg5NThsLTEyLjQ5OSAxNi4yMjIzYy0yLjI5OCAzLjAxNDgtLjcxOCA3LjMyMTYgMy4wMTcgNy44OTU5bDIwLjQgMy41ODljNC41OTcuODYxMyA1LjYwMyA2Ljg5MDkgMS41ODEgOS4xODc4bC0xOC4xMDIgMTAuMTkyOGMtMy4zMDQgMS44NjYtMy40NDggNi40Ni0uMjg3IDguNDdsMTcuNTI3IDExLjE5OGMzLjg3OCAyLjQ0IDIuNTg2IDguNjEzLTIuMDEyIDkuMTg4bC0yMC41NDMgMi41ODRjLTMuNzM1LjQzLTUuNjAzIDQuNzM3LTMuNDQ4IDcuNzUybDExLjkyNCAxNi45NGMyLjU4NiA0LjAyLTEuMDA2IDkuMDQ0LTUuNDU5IDcuNzUyeiIgZmlsbD0iIzgxYTJlZiIvPjwvc3ZnPg==" alt="" /> */}
              <div>
                {"ENGINEERING".split("").map((letter, index) => (
                  <span key={index} className="header-letter">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </div>
              <span className="header-letter"> </span>
              <div className="flex">
                <span className="header-letter flex items-center justify-center rounded-bl-lg rounded-tl-lg bg-orange-400 px-4 text-8xl text-white">
                  IN
                </span>
                <span className="header-letter flex items-center justify-center border-2 px-4 text-8xl text-blue-500">
                  D
                </span>
                <span className="header-letter flex items-center justify-center rounded-br-lg rounded-tr-lg border-2 bg-green-500 px-4 text-8xl text-white">
                  IA
                </span>
              </div>
            </h1>

            <h2
              className={`subtitle ${bebasNeue.className} mb-8 rounded-lg bg-[#0094FF] px-10 py-1 text-3xl font-semibold text-white sm:text-4xl md:text-5xl lg:text-8xl`}
            >
              Ycce
            </h2>

            <p className="mx-auto mb-8 max-w-3xl text-base text-zinc-700 sm:text-lg md:text-xl z-20">
              Engineering India: YCCE's hub for{" "}
              <Link href="/docs" className="text-[#0094FF] hover:underline">
                creative engineers
              </Link>{" "}
              . We build, learn, and innovate.
            </p>

            <Link
              href="/events"
              className="cta-button mb-6 inline-flex items-center rounded-lg bg-[#0094FF] px-6 py-2 text-base font-medium text-white transition-colors hover:bg-[#0094FF]/90 sm:text-lg md:px-8 md:py-3 md:text-xl"
            >
              GET STARTED
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <p className="text-xs text-gray-400 sm:text-sm">Free Registration</p>

            <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-y-8 px-4 text-zinc-700 sm:grid-cols-3 sm:gap-x-8 sm:px-6">
              {[ 
                { icon: Rocket, count: "80+", label: "Passionate Engineers & Innovators" },
                { icon: Building, count: "20+", label: "Tech Workshops & Hackathons" },
                { icon: Users, count: "500+", label: "Community Members Strong" },
              ].map(({ icon: Icon, count, label }, index) => (
                <div key={index} className="stat-item flex flex-col items-center gap-y-2 text-center">
                  <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                  <div className="leading-snug">
                    <h1 className="text-2xl font-thin tracking-wide sm:text-3xl md:text-4xl">{count}</h1>
                    <p className="text-sm sm:text-base md:text-lg">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="trusted-by mt-16 w-full max-w-3xl text-center text-zinc-700">
              <h3 className="mb-6 text-lg font-semibold sm:text-xl md:text-2xl">TRUSTED BY</h3>
            </div>
          </div>
        </Container>
      </Section>

      {[AboutSection, FeatureCarousel, EventsGallery, Feedback, Timeline, Faq].map((Component, index) => (
        <Section key={index}>
          <div className="min-h-screen w-full">
            <Component />
          </div>
        </Section>
      ))}
    </>
  );
}
