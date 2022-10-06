import Link from 'next/link'
import Style from '../styles/episode.module.css'

export default function layout({children})  {
  return (
    <div className={Style.main}>
    <div>{children}</div>
    </div>
  )
}


