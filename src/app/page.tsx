'use client'
// TODO: How can we break out this file into components
//       so we don't need to 'use client' here? Kinda defeats
//       the purpose of Next's serve-side rendering 🤔

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'

function FilterDropdown() {
  // TODO: Filter search results based on activities
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Filter <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Activities</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked>
          <CrosshairIcon className="w-4 h-4 mr-2" />
          Hunting
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          <CaravanIcon className="w-4 h-4 mr-2" />
          Camping
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>
          <FishIcon className="w-4 h-4 mr-2" /> Fishing
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function SearchInput() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="relative w-full max-w-lg mx-auto mb-3">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search"
            className="w-full rounded-l-md border border-muted px-4 py-6 pl-10 shadow-sm text-md transition-colors focus:border-primary focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2">
            <FilterDropdown />
            <Button
              onClick={() => {
                // TODO:  You could implement search on click (not live search) here.
                alert('Search clicked')
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NoListings() {
  return (
    <div className="text-center">
      <h3 className="text-xl">No listings available</h3>
      <p className="opacity-50">Try removing filters and searching again</p>
    </div>
  )
}

type Listing = {
  id: string
  title: string
  location: Location
  price: number
  rating: number
  activity: Activity
  imageUrl: string
}

type Location = {
  state: string
  city: string
}

type Activity = 'Hunting' | 'Camping' | 'Fishing'

function ActivityLabel({
  type,
  onClick,
}: {
  type: Activity
  onClick?: () => void
}) {
  return (
    <Button
      onClick={onClick}
      className="bg-muted rounded-full text-xs text-muted-foreground hover:bg-gray-300 flex items-center gap-1"
    >
      {type === 'Fishing' ? (
        <FishIcon className="w-4 h-4" />
      ) : type === 'Camping' ? (
        <CaravanIcon className="w-4 h-4" />
      ) : (
        <CrosshairIcon className="w-4 h-4" />
      )}
      {type}
    </Button>
  )
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Card className="w-full max-w-[500px] rounded-xl overflow-hidden transition-all hover:shadow-sm relative">
      <Link href="#" className="block" prefetch={false}>
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          width={400}
          height={240}
          className="w-full h-60 object-cover"
          priority
        />
      </Link>
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold">{listing.title}</h3>
            <p className="text-sm text-muted-foreground">
              {listing.location.city}, {listing.location.state}
            </p>
            <div className="flex items-center gap-2 mt-2 py-3">
              <ActivityLabel type={listing.activity} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <StarIcon className="w-4 h-4" />
            <span className="font-medium">{listing.rating}</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-lg font-semibold">
            ${listing.price}{' '}
            <span className="text-sm font-normal text-muted-foreground">
              /night
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// TODO: Replace this hardcoded data with listings from the API
const Listings: Listing[] = [
  {
    id: '1',
    title: 'Camping in Times Square',
    location: { state: 'NY', city: 'New York' },
    price: 999,
    rating: 4.99,
    activity: 'Camping',
    imageUrl: '/camping.gif',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4">
      <main className="flex flex-col items-center pt-12 flex-grow">
        <Logo />
        <SearchInput />
        {/* <NoListings /> */}
        <ListingCard listing={Listings[0]} />
      </main>
      <Footer />
    </div>
  )
}

function Logo() {
  return (
    <Image src="/sabo.png" alt="SABO logo" width={200} height={200} priority />
  )
}

function Footer() {
  return (
    <footer className="w-full p-4 text-xs text-left">
      <Link
        className="flex items-center opacity-20 hover:opacity-100"
        href="https://github.com/gosabo/takehome"
      >
        <GithubIcon /> <span className="pl-2 font-mono">Source</span>
      </Link>
    </footer>
  )
}

// Just in case you think what's missing is Clippy
function Clippy() {
  return (
    <Link href="#">
      <Image
        src="/clippy.gif"
        alt="Clippy"
        width={100}
        height={100}
        className="absolute top-0 left-0"
      />
    </Link>
  )
}

//=== ICONS ===
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function CaravanIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="4" height="4" x="2" y="9" />
      <rect width="4" height="10" x="10" y="9" />
      <path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" />
      <circle cx="8" cy="19" r="2" />
      <path d="M10 19h12v-2" />
    </svg>
  )
}

function CrosshairIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" x2="18" y1="12" y2="12" />
      <line x1="6" x2="2" y1="12" y2="12" />
      <line x1="12" x2="12" y1="6" y2="2" />
      <line x1="12" x2="12" y1="22" y2="18" />
    </svg>
  )
}

function FishIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
      <path d="M18 12v.5" />
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
    </svg>
  )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.26.793-.577 0-.285-.011-1.042-.016-2.047-3.338.724-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.809 1.305 3.495.998.108-.774.418-1.305.762-1.606-2.665-.305-5.467-1.333-5.467-5.933 0-1.311.469-2.381 1.235-3.221-.123-.305-.535-1.53.118-3.187 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.398 3.005-.403 1.02.005 2.048.137 3.005.403 2.291-1.552 3.297-1.23 3.297-1.23.654 1.656.243 2.882.12 3.187.769.84 1.233 1.91 1.233 3.221 0 4.61-2.807 5.625-5.478 5.921.43.372.823 1.104.823 2.224 0 1.606-.015 2.9-.015 3.293 0 .32.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
        clipRule="evenodd"
      />
    </svg>
  )
}
