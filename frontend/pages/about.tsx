import Head from 'next/head';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Post } from '../components/Post';
import { Sidebar } from '../components/Sidebar';
import { Main } from '../layouts/Main';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const aboutContent = `
# About Page

This is the **about page** of our blog. Here we discuss various topics.

- Item 1
- Item 2
`;
export default function About() {
  return (
    <>
      <Head>
        <title>Khanh Phan's Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icons/ubuntu-icon.svg" />
      </Head>
      <Main>
        <MarkdownRenderer markdown={aboutContent} />
      </Main>
    </>
  );
}