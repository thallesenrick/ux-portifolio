import { useRef, useEffect, useState } from 'react';
import './Squares.css';

const Squares = ({
  direction = 'diagonal',
  speed = 0.2,
  borderColor = 'rgba(255, 255, 255, 0.09)',
  squareSize = 90,
  className = ''
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef();
  const numSquaresY = useRef();
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoverSquare = useRef(null);
  const particles = useRef([]); // quadrados coloridos que aparecem e somem

  const getIsDarkMode = () =>
    document.documentElement.classList.contains('dark') ||
    document.body.classList.contains('dark');

  const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode());

  // Observa mudanças de tema (classe .dark)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(getIsDarkMode());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const hoverFillColor = isDarkMode
      ? 'rgba(0, 140, 255, 0.25)' // azul translúcido
      : 'rgba(255, 215, 0, 0.25)'; // amarelo translúcido

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 🎨 Função para gerar cor aleatória baseada no tema
    const randomColor = () => {
      if (isDarkMode) {
        // Azuladas
        const blues = [
          'rgba(0, 102, 255, 0.15)',
          'rgba(30, 144, 255, 0.25)',
          'rgba(70, 160, 255, 0.35)',
          'rgba(100, 180, 255, 0.4)',
        ];
        return blues[Math.floor(Math.random() * blues.length)];
      } else {
        // Âmbar/douradas
        const ambers = [
          'rgba(255, 191, 0, 0.15)',
          'rgba(255, 200, 60, 0.25)',
          'rgba(255, 210, 100, 0.3)',
          'rgba(255, 220, 130, 0.35)',
        ];
        return ambers[Math.floor(Math.random() * ambers.length)];
      }
    };

    // 🔹 Função que cria novos quadrados coloridos de forma aleatória
    const createRandomSquares = () => {
      if (Math.random() < 0.1) {
        const x = Math.floor(Math.random() * numSquaresX.current);
        const y = Math.floor(Math.random() * numSquaresY.current);
        particles.current.push({
          x,
          y,
          color: randomColor(),
          life: Math.random() * 200 + 100, // duração variável
          alpha: Math.random() * 0.4 + 0.2,
        });
      }
    };

    // 🔹 Atualiza os quadrados coloridos existentes
    const updateParticles = () => {
      particles.current.forEach(p => {
        p.life -= 1;
        p.alpha = Math.max(0, p.life / 300); // desvanece suavemente
      });
      particles.current = particles.current.filter(p => p.life > 0);
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          // hover
          if (
            hoverSquare.current &&
            Math.floor((x - startX) / squareSize) === hoverSquare.current.x &&
            Math.floor((y - startY) / squareSize) === hoverSquare.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      // 🎨 desenha quadrados coloridos (partículas)
      for (const p of particles.current) {
        const px = p.x * squareSize - (gridOffset.current.x % squareSize);
        const py = p.y * squareSize - (gridOffset.current.y % squareSize);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/g, `${p.alpha})`);
        ctx.fillRect(px, py, squareSize, squareSize);
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.current.x = (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.current.y = (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.current.x = (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y = (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      createRandomSquares();
      updateParticles();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = event => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoverX = Math.floor((mouseX + gridOffset.current.x - startX) / squareSize);
      const hoverY = Math.floor((mouseY + gridOffset.current.y - startY) / squareSize);

      if (
        !hoverSquare.current ||
        hoverSquare.current.x !== hoverX ||
        hoverSquare.current.y !== hoverY
      ) {
        hoverSquare.current = { x: hoverX, y: hoverY };
      }
    };

    const handleMouseLeave = () => {
      hoverSquare.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed, borderColor, squareSize, isDarkMode]);

  return <canvas ref={canvasRef} className={`squares-canvas ${className}`}></canvas>;
};

export default Squares;
