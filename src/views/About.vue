<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="relative bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto" style="min-height: calc(100vh - 35px)">
      <div style="min-height: calc(100vh - 35px)">
        <svg
          class="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>

        <Popover>
          <div class="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav
              class="relative flex items-center justify-between sm:h-10 lg:justify-start"
              aria-label="Global"
            >
              <div
                class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0"
              >
                <div class="flex items-center justify-between w-full md:w-auto">
                  <a href="#">
                    <span class="sr-only">Workflow</span>
                    <img
                      alt="Workflow"
                      class="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    />
                  </a>
                  <div class="-mr-2 flex items-center md:hidden">
                    <PopoverButton
                      class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <span class="sr-only">Open main menu</span>
                      <MenuIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
              </div>
              <div class="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="item.to == $route.path ? 'text-gray-900' : ''"
                  class="font-medium text-gray-500 hover:text-gray-900"
                >
                  {{ item.name }}
                </router-link>

                <router-link
                  to="/login"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  >Log in</router-link
                >
              </div>
            </nav>
          </div>

          <transition
            enter-active-class="duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <PopoverPanel
              focus
              class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div
                class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
              >
                <div class="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img
                      class="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt=""
                    />
                  </div>
                  <div class="-mr-2">
                    <PopoverButton
                      class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                      <span class="sr-only">Close main menu</span>
                      <XIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
                <div class="px-2 pt-2 pb-3 space-y-1">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.to"
                    :class="item.to == $route.path ? 'text-gray-900' : ''"
                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >{{ item.name }}</router-link
                  >
                </div>
                <router-link
                  to="/login"
                  class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                >
                  Log in
                </router-link>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <main
          class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
        >
          <div class="sm:text-center lg:text-left w-full">
            <h1
              class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block xl:inline">Code Challenge</span>
              {{ " " }}
              <span class="block text-indigo-600 xl:inline"
                >helps you hire the best developers.
              </span>
            </h1>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Create a Coding Challenge, invite developers to join, and hire the
              best ones who solved your Challenge best.
            </p>
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div class="rounded-md shadow">
                <router-link
                  to="/login"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </router-link>
              </div>
            </div>
          </div>
          <div class="py-12 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="lg:text-center">
                <h2
                  class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
                >
                  Transactions
                </h2>
                <p
                  class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                >
                  A better way to send money
                </p>
                <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
                  magnam voluptatum cupiditate veritatis in accusamus quisquam.
                </p>
              </div>

              <div class="mt-10">
                <dl
                  class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10"
                >
                  <div
                    v-for="feature in features"
                    :key="feature.name"
                    class="relative"
                  >
                    <dt>
                      <div
                        class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
                      >
                        <component
                          :is="feature.icon"
                          class="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                      <p
                        class="ml-16 text-lg leading-6 font-medium text-gray-900"
                      >
                        {{ feature.name }}
                      </p>
                    </dt>
                    <dd class="mt-2 ml-16 text-base text-gray-500">
                      {{ feature.description }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/vue/outline";

const features = [
  {
    name: "Competitive exchange rates",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    name: "No hidden fees",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    name: "Transfers are instant",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
  },
  {
    name: "Mobile notifications",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: AnnotationIcon,
  },
];
const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
];
</script>
