import { useEffect, useState } from 'react';
import '@/App.css';
import { Sidebar } from './components/ui/sidebar.tsx';
import React from 'react';
import { ChevronsUp, Dices } from 'lucide-react';
import { Masonry } from './components/ui/masonry.tsx';
import apiConfig from './config/api.ts';

interface Collection {
  id: string;
  title: string;
  images: string[];
}

function App() {
  const [title, setTitle] = useState('');
  const [collections, setCollections] = useState([] as Collection[]);
  const [images, setImages] = useState([] as string[]);
  const [randomPlay, setRandomPlay] = useState(false);

  function changeCollection(id: string) {
    collections.map(collection => {
      if (collection.id != id) {
        return;
      }

      setTitle(collection.title);
      setImages(collection.images);
      scrollToTop();
    })
  }

  function scrollToTop() {
    document.getElementById('main')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    fetch(`${apiConfig.baseUrl}/list`)
      .then(response => response.json())
      .then(data => {
        setCollections(data);
        if (data.length > 0) {
          setTitle(data[0].title);
          setImages(data[0].images);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }, []);

  return (
    <div className='grid grid-cols-[auto_1fr] max-md:grid-cols-1 grid-rows-1 h-screen'>
      <Sidebar collections={
        collections
      }
      onItemClicked={changeCollection}
      />

      <div id="main" className='grid-in-main h-screen overflow-y-scroll'>
      {
        images.length == 0 ? (
        <div className='flex h-full justify-center items-center text-[#3f3f3f]'>
          暂时没有图片
        </div>
        ) : (
        <div id='gallery' className='flex flex-col bg-white rounded-[10px] m-[0.5rem] shadow-[3px_3px_10px_0px_rgba(182,182,182,0.57)] py-[0.8rem] px-0'>
          <div className='grid grid-cols-[1fr_auto] sticky top-0 bg-white z-10 p-[1rem] border-b border-dashed border-[#ebebeb] text-[#3f3f3f] font-[0.8rem]'>
            <div>{ title }</div>
            <div className="flex text-[#b62e2e] cursor-pointer justify-center gap-[1rem]">
              <div
                onClick={() => { setRandomPlay(true); }}
                aria-label="随机播放"
              >
                <Dices />
              </div>
              <div className="w-0 h-full border-l border-dashed border-[#b62e2e]" />
              <div
                onClick={() => {scrollToTop();}}
                aria-label="回到顶部"
              >
                <ChevronsUp />
              </div>
            </div>
          </div>

          <Masonry
            images={images}
            randomPlay={randomPlay}
            onStopPlay={ () => setRandomPlay(false) }
          />
        </div>
        )}
      </div> {/* div main */}
    </div>
  )
}

export default App
