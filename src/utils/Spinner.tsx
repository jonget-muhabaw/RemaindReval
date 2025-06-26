import React from "react"
import "./spinner.css"
interface SpinnerProps{
  size?:'small' | 'medium' | 'large';
  color?:string
}
const Spinner: React.FC<SpinnerProps> = ({
  size='medium',
  color='#014359'
}) => {
  const sizeClass = {
    small: 'w-8 h-8 border-2',
    medium:'w-12 h-12 border-3',
    large:'w-16 h-16 border-4'
  }
  return (
    <div
      className={`rounded-full border-t-transparent animate-spin ${sizeClass
       [ size]
      }`}
      style={{ borderColor: color }}
    >

    </div>
  );
}

export default Spinner