"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const featuredCollections: { title: string; href: string; description: string }[] = [
  {
    title: "Diamond Collection",
    href: "/collections/diamonds",
    description:
      "Exquisite diamond jewelry featuring brilliant cuts and timeless designs.",
  },
  {
    title: "Wedding Rings",
    href: "/collections/wedding-rings",
    description:
      "Symbol of eternal love with our handcrafted wedding ring collection.",
  },
  {
    title: "Statement Necklaces",
    href: "/collections/statement-necklaces",
    description:
      "Bold and elegant necklaces that make a stunning impression.",
  },
  {
    title: "Tennis Bracelets",
    href: "/collections/tennis-bracelets",
    description: "Classic tennis bracelets with sparkling diamonds.",
  },
  {
    title: "Pearl Earrings",
    href: "/collections/pearl-earrings",
    description:
      "Sophisticated pearl earrings for every occasion and style.",
  },
  {
    title: "Gift Sets",
    href: "/collections/gift-sets",
    description:
      "Beautifully curated jewelry sets perfect for special occasions.",
  },
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      Luxury Jewelry
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Discover our exquisite collection of handcrafted jewelry pieces.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/collections/new-arrivals" title="New Arrivals">
                Latest jewelry pieces added to our exclusive collection.
              </ListItem>
              <ListItem href="/collections/bestsellers" title="Bestsellers">
                Most popular jewelry pieces loved by our customers.
              </ListItem>
              <ListItem href="/collections/sale" title="Sale">
                Special offers on selected jewelry pieces.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Featured</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {featuredCollections.map((collection) => (
                <ListItem
                  key={collection.title}
                  title={collection.title}
                  href={collection.href}
                >
                  {collection.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/brands">Brands</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/earrings">Earrings</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/necklaces">Necklaces</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/rings">Rings</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/bracelets">Bracelets</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/gifts">Gifts</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
