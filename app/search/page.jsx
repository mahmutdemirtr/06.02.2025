'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import Loader from '../loading'
import { Input } from '@/components/ui/input'
import SearchResultsCard from '@/components/search/SearchResultsCard';

import crossCircled from '@/public/images/cross-circle.png'


export default function Search() {
  const [unlockInputValue, setUnlockInputValue] = useState('');
  // const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  // Handle input change
  const handleInputChange = (e) => {
    setUnlockInputValue(e.target.value);
    setIsTyping(true);
    setIsLoading(true);
    setHasResults(false);
  };

  const handleClearInput = () => {
    setUnlockInputValue('');
    setIsTyping(false);
    setIsLoading(false);
    setHasResults(false);
  }


  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasResults(unlockInputValue.length > 0);
      setIsTyping(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [unlockInputValue, isTyping]);


  return (
    <div className='max-w-[767px] mx-auto relative pb-4 bg-gradient-to-br from-[#7F73C7] to-[#C097DB] min-h-screen w-full'>
      <div className='relative w-3/4 mx-auto py-28'>
        <Input
          type='email'
          placeholder="@"
          className='p-6 shadow-lg'
          onChange={handleInputChange}
          value={unlockInputValue}
        />
        <button
          onClick={handleClearInput}
          aria-label="Clear input"
          className='absolute right-4 top-[calc(50%-10px)] text-primary'>
          <Image
            src={crossCircled}
            alt=''
            className='text-xl'
            height={'auto'} />
        </button>
      </div>
      <div className='flex flex-col gap-4 px-6'>
        {isLoading ? (
          <Loader loadingType='fetchLoader' />
        ) : hasResults ? (
          <>
            <SearchResultsCard />
            <SearchResultsCard />
            <SearchResultsCard />
            <SearchResultsCard />
            <SearchResultsCard />
          </>) : (
          <p className='flex items-center justify-center text-white'>No Results</p>
        )}
      </div>
    </div>
  )
}
