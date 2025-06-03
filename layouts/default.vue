<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    <SiteHeader />
    <main class="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <slot/>
    </main>
    <SiteFooter />
  </div>
</template>