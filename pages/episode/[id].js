import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import Layout from "../../components/layout"
import Styles from "../../styles/episode.module.css"
import Link from 'next/link'
import Image from 'next/image'

export async function getStaticProps(context) {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache()
  });
  
  const {data} = await client.query({
    query: gql`
    query {
      episode(id:${context.params.id}){
          id
          name
          episode
          air_date
          characters{
            name
            gender
            status
            image
            id
          
        }
      }
  }
    `
  });
  return{
    props:{
      episode: data.episode
    }
  }
}

export function getStaticPaths() {
  const params=[];
  for(let i=1; i<=51; i++){
      params.push({params : {id : i.toString()}})};
  return{
    paths: params,
    fallback: false
  }
}


export default function episode({episode}) {
  
  return (
    <Layout>
    <div className={Styles.title}><span className={Styles.highlight}>{episode.name}</span> Episode </div>
    <p className={Styles.date}>Aired On {episode.air_date}</p>
    <p className={Styles.desc}>List of All Rick And Morty characters that had an appearance on episode <span className={Styles.highlight}>{episode.name}</span></p>
    <Link href="/">
        <a className={Styles.back}>
            go home
        </a>
    </Link>
    <div className={Styles.container}>
      {episode.characters.map((character, index)=>{
        return(
          <Link href={"/character/"+character.id.toString()} key={index}>
          <div className={Styles.card} key={character.id}>
            <Image src={character.image} width="250px" height="250px" className={Styles.image} alt="character-image"></Image>
            <div><span className={Styles.info}>Name:</span> {character.name}</div>
            <div><span className={Styles.info}>Gender:</span> {character.gender}</div>
            <div><span className={Styles.info}>Status:</span> <span className={character.status==="Alive"?Styles.alive: Styles.dead}>{character.status}</span></div>
          </div>
          </Link>
        ) 
      })}
    </div>
    </Layout>
  )
}

