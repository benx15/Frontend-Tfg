import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard = () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (token) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};

export const adminGuard = () => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
        router.navigate(['/login']);
        return false;
    }
    const rol = localStorage.getItem('rol');

    if (rol === 'ADMON') {
        return true;
    }

    router.navigate(['/login']);
    return false;
};

export const trabajadorGuard = () => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
        router.navigate(['/login']);
        return false;
    }
    const rol = localStorage.getItem('rol');

    if (rol === 'TRABAJADOR') {
        return true;
    }

    router.navigate(['/login']);
    return false;
};

export const clienteGuard = () => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
        router.navigate(['/login']);
        return false;
    }
    const rol = localStorage.getItem('rol');

    if (rol === 'CLIENTE') {
    return true;
    }

    
    return false;
};