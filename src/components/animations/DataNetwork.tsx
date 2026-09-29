"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function DataNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame: number;


    const mouse = {
        x: -1000,
        y: -1000,
        radius: 180,
        active: false,
        };

    const nodes: Node[] = [];


    const createNodes = () => {

      nodes.length = 0;

      const count = window.innerWidth < 768 ? 50 : 90;


      for (let i = 0; i < count; i++) {

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });

      }

    };



    const resize = () => {

      const dpr = window.devicePixelRatio || 1;

      width = canvas.offsetWidth;
      height = canvas.offsetHeight;


      canvas.width = width * dpr;
      canvas.height = height * dpr;


      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );


      if(nodes.length === 0){
        createNodes();
      }

    };



    const mouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();

            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
            };


    const mouseLeave = () => {
        mouse.active = false;
        };


    window.addEventListener(
      "mousemove",
      mouseMove
    );


    window.addEventListener(
      "mouseleave",
      mouseLeave
    );


    window.addEventListener(
      "resize",
      resize
    );


    requestAnimationFrame(() => {
  resize();
});



    const animate = ()=>{


      ctx.clearRect(
        0,
        0,
        width,
        height
      );



      nodes.forEach((node)=>{

  const dx = node.x - mouse.x;
  const dy = node.y - mouse.y;

  const distance = Math.sqrt(
    dx * dx + dy * dy
  );


  // Strong cursor repulsion
  if(mouse.active && distance < mouse.radius){

    const force =
      (mouse.radius - distance) / mouse.radius;


    node.x += (dx / distance) * force * 3;
    node.y += (dy / distance) * force * 3;

  }


  node.x += node.vx;
  node.y += node.vy;


  if(node.x < 0 || node.x > width)
    node.vx *= -1;


  if(node.y < 0 || node.y > height)
    node.vy *= -1;

});

// Cursor energy field

// if(mouse.active){

//   const gradient =
//     ctx.createRadialGradient(
//       mouse.x,
//       mouse.y,
//       0,
//       mouse.x,
//       mouse.y,
//       mouse.radius
//     );


//   gradient.addColorStop(
//     0,
//     "rgba(34,211,238,0.25)"
//   );


//   gradient.addColorStop(
//     1,
//     "rgba(34,211,238,0)"
//   );


//   ctx.beginPath();

//   ctx.fillStyle = gradient;

//   ctx.arc(
//     mouse.x,
//     mouse.y,
//     mouse.radius,
//     0,
//     Math.PI * 2
//   );

//   ctx.fill();

// }



      // Connections

      nodes.forEach((a,index)=>{


        nodes.slice(index+1).forEach((b)=>{


          const distance =
            Math.hypot(
              a.x-b.x,
              a.y-b.y
            );



          if(distance < 170){


            let opacity =
              0.18 - distance / 1200;



            // brighter near cursor
            const cursorDistance =
              Math.hypot(
                mouse.x - a.x,
                mouse.y - a.y
              );


            if(cursorDistance < 150){
              opacity += 0.35;
            }



            ctx.beginPath();


            ctx.strokeStyle =
              `rgba(34,211,238,${opacity})`;


            ctx.lineWidth = 1;


            ctx.moveTo(
              a.x,
              a.y
            );


            ctx.lineTo(
              b.x,
              b.y
            );


            ctx.stroke();


          }


        });


      });




      // Nodes

      nodes.forEach((node)=>{


        const cursorDistance =
          Math.hypot(
            mouse.x-node.x,
            mouse.y-node.y
          );


        const size =
          cursorDistance < 120
          ? 4
          : 2.2;



        ctx.beginPath();


        ctx.arc(
          node.x,
          node.y,
          size,
          0,
          Math.PI*2
        );


        ctx.fillStyle =
          "#67E8F9";


        ctx.shadowBlur =
          cursorDistance < 150
          ? 25
          : 15;


        ctx.shadowColor =
          "#22D3EE";


        ctx.fill();


      });



      animationFrame =
        requestAnimationFrame(
          animate
        );

    };


    animate();



    return()=>{

      cancelAnimationFrame(animationFrame);


      window.removeEventListener(
        "resize",
        resize
      );


      window.removeEventListener(
        "mousemove",
        mouseMove
      );


      window.removeEventListener(
        "mouseleave",
        mouseLeave
      );

    };


  },[]);



  return(
    <canvas
  ref={canvasRef}
  className="
    fixed
    inset-0
    z-0
    h-dvh
    w-screen
    pointer-events-none
  "
/>
  );

}