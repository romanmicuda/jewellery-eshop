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
]

export function NavigationMenuDemo() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=earrings">Earrings</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=necklaces">Necklaces</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=rings">Rings</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=bracelets">Bracelets</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

                <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=pendants">Pendants</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

                <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=anklets">Anklets</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

                <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=cufflinks">Cufflinks</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

                <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product-list?category=brooches">Brooches</Link>
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
