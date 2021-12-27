import styles from '@/components/GradientWave.module.scss';

type RGBAstring = `rgba(${string})`;

export default function Path({ id, color }: {id: number; color: RGBAstring}) {

  let className;
  switch (id) {
    case 1:
      className = styles.svgWave1;
      break;
    case 2:
      className = styles.svgWave2;
      break;
    case 3:
      className = styles.svgWave3;
      break;
  }

  return (
    <svg viewBox="0 0 1000 150" className={className}>
      <defs>
        <linearGradient id={`grad${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: color, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path 
        d={`
          M 0,0 
          C 250,0 250,50 500,50 
          s 250,-50 500,-50
          l 0,150
          l -1000,0
          z
        `.replace(/\s+/g, ' ')}
        fill={`url(#grad${id})`}
      />
    </svg>
  )
}