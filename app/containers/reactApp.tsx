'use client'

import React, {useEffect, useState} from 'react';
import { Workspace } from './workspace';
import Playground  from './playground'

import '../globals.css';
import "xp.css/dist/XP.css";

export default function ReactApp() {
    return (
        <main>
            <Workspace />
        </main>
    );
}
