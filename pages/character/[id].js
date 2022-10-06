import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Styles from '../../styles/character.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function ({character}) {
  return (
    <div className={Styles.main}>
        <div className={Styles.header}>
            <Link href="/">
                <a className={Styles.back}>
                     go home
                </a>
            </Link>
            <Image src={character.image} width={250} height={250} className={Styles.image}></Image>
                <p>{character.name}</p>
                <p>{character.gender}</p>
                <p className={character.status=="Alive"?Styles.alive:Styles.dead}>{character.status}</p>
        </div>
        <div>
        <h3>Featured in the following episodes</h3>
        <div className={Styles.container}>
        
            {character.episode.map((episode)=>{
                return(
                    <Link href={"/episode/"+episode.id.toString()} key={episode.id}>
                        <div className={Styles.card}>
                            <h2>{episode.name}</h2>
                            <p>{episode.episode}</p>
                            <p>{episode.air_date}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    </div>
    </div>
  )
}

export async function getStaticProps(context) {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache()
      });
      
      const {data} = await client.query({
        query: gql`
        query {
          character(id:${context.params.id}){
            name
            gender
            status
            image
                episode{
                  name
                  episode
                  air_date
                  id
                }
          }
      }
        `
      });
      return{
        props:{
          character: data.character
        }
      }
}

export function getStaticPaths() {
    const params=[];
    for(let i=1; i<=826; i++){
        params.push({params : {id : i.toString()}})};
    return{
      paths: params,
      fallback: false
    }
  }
