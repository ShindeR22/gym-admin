import { writable } from 'svelte/store';

export const isSidebarOpen = writable(false);
export const isMobile = writable(false);

if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        isMobile.set(mediaQuery.matches);
        mediaQuery.addEventListener('change', (e) => {
                isMobile.set(e.matches);
                if (!e.matches) {
                        isSidebarOpen.set(false); // Close sidebar when switching to desktop
                }
        });
}