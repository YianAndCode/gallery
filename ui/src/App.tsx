import { useEffect, useState } from 'react';
import '@/App.css';
import { Sidebar } from './components/ui/sidebar.tsx';
import React from 'react';
import { ChevronsUp, Dices } from 'lucide-react';
import { Masonry } from './components/ui/masonry.tsx';

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
    console.log('changeCollection', id, collections);
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
    fetch('/api/list')
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
    <div className='container'>
      <Sidebar collections={
        collections
      }
      onItemClicked={changeCollection}
      />

      <div id="main" className='main'>
      {
        images.length == 0 ? (
        <div style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#3f3f3f",
        }}>
          暂时没有图片
        </div>
        ) : (
        <div id='gallery' className='gallery'>
          <div className='gallery-header'>
            <div>{ title }</div>
            <div className="gallery-header-btn-group">
              <div
                onClick={() => { setRandomPlay(true); }}
                aria-label="随机播放"
              >
                <Dices />
              </div>
              <div className="button-divider" />
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
