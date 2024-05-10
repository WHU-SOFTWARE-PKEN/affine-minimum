<template>
  <ClientOnly>
    <main>
      <Init />
    </main>

    <template #fallback>
      <div>Loading...</div>
    </template>
  </ClientOnly>
</template>

