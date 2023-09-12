import { useEffect, useRef } from 'react';
import GridItem from './GridItem';

function Saturn({ numbers }) {

    const containerRef = useRef(undefined)
    const canvasRef = useRef(undefined)


    function updateCanvasPosition() {
        const container = containerRef.current
        const canvas = canvasRef.current

        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        canvas.style.top = `${container.offsetTop}px`
        canvas.style.left = `${container.offsetLeft}px`

        if (numbers.length) {
            drawCanvas()
        }
    }

    function drawCanvas() {

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'red';
        context.lineWidth = 2;

        const coordinates = [];

        for (let i = 0; i < numbers.length; i++) {
            const element = document.getElementById(numbers[i])
            if (element) {
                const rect = element.getBoundingClientRect();
                const x = rect.left - canvas.getBoundingClientRect().left + element.clientWidth / 2;
                const y = rect.top - canvas.getBoundingClientRect().top + element.clientHeight / 2;
                coordinates.push({ x, y });
            }
        }



        if (coordinates.length >= 2) {
            for (let i = 0; i < coordinates.length - 1; i++) {
                context.beginPath();
                context.moveTo(coordinates[i].x, coordinates[i].y);
                context.lineTo(coordinates[i + 1].x, coordinates[i + 1].y);
                context.stroke();
            }
        }

        const firstPoint = coordinates[0];
        context.beginPath();
        context.arc(firstPoint.x, firstPoint.y, 5, 0, Math.PI * 2);
        context.fillStyle = 'red';
        context.fill();

        // const lastPoint = coordinates[coordinates.length - 1];
        // context.beginPath();
        // context.moveTo(lastPoint.x, lastPoint.y);
        // context.lineTo(lastPoint.x, lastPoint.y - 20); // Ajuste a posição vertical conforme necessário
        // context.moveTo(lastPoint.x, lastPoint.y);
        // context.lineTo(lastPoint.x, lastPoint.y + 20); // Ajuste a posição vertical conforme necessário
        // context.stroke();

        context.closePath()
    }

    function clearCanvas() {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    useEffect(() => {
        updateCanvasPosition()

        window.addEventListener('resize', updateCanvasPosition)
        return () => {
            window.removeEventListener('resize', updateCanvasPosition)
        }
    }, [])

    useEffect(() => {
        if (numbers.length) {
            drawCanvas()
        } else {
            clearCanvas()
        }
    }, [numbers])

    const saturnNumbers = [4, 9, 2, 3, 5, 7, 8, 1, 6]

    return (
        <div
            ref={containerRef}
            className="grid grid-cols-3 gap-1 p-1 bg-black"
        >
            {saturnNumbers.map(e => <GridItem key={`saturn-${e}`}>{e}</GridItem>)}
            <canvas ref={canvasRef} className="absolute" />
        </div>
    )
}

export default Saturn