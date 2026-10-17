        // Função para copiar o link da página atual
        function copyProfileLink() {
            // Cria um elemento input temporário para usar o execCommand
            // Esta abordagem é utilizada para garantir compatibilidade com restrições de iFrame
            const dummy = document.createElement('input');
            const text = window.location.href; // Copia a URL atual
            
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            
            showToast();
        }

        // Função para mostrar notificação de feedback (Toast)
        function showToast() {
            const toast = document.getElementById('toast');
            
            // Mostra o toast
            toast.classList.remove('opacity-0', 'translate-y-4');
            toast.classList.add('opacity-100', 'translate-y-0');
            
            // Esconde após 3 segundos
            setTimeout(() => {
                toast.classList.remove('opacity-100', 'translate-y-0');
                toast.classList.add('opacity-0', 'translate-y-4');
            }, 3000);
        }

        // Efeito 3D sutil ao mover o mouse pela tela (opcional para dar mais sensação "tech")
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.link-btn');
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;

            // Aplica um levíssimo parallax de fundo nos blobs brilhantes
            const glow1 = document.querySelector('.glow-1');
            const glow2 = document.querySelector('.glow-2');
            
            if(glow1 && glow2) {
                glow1.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
                glow2.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        // --- Tech Particles System ---
        const canvas = document.getElementById('tech-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particlesArray = [];
        const numberOfParticles = 60; // Quantidade de conexões
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Azul metálico
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                                 + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width/7) * (canvas.height/7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            connect();
        }
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
        
        init();
        animateParticles();
