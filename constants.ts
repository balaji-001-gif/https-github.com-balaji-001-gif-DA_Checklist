
import { ChecklistCategory, TaskStatus } from './types';

export const INITIAL_CHECKLIST_DATA: ChecklistCategory[] = [
  {
    id: 'security',
    title: 'Security & Access',
    tasks: [
      { id: 1, description: 'Enter office using assigned access key / card', status: TaskStatus.PENDING, remarks: '' },
      { id: 2, description: 'Check for any overnight security updates/messages', status: TaskStatus.PENDING, remarks: '' },
      { id: 3, description: 'Confirm CCTV cameras active and recording', status: TaskStatus.PENDING, remarks: '' },
      { id: 4, description: 'Ensure all doors are unlocked', status: TaskStatus.PENDING, remarks: '' },
    ],
  },
  {
    id: 'environment',
    title: 'Office Environment Preparation',
    tasks: [
      { id: 1, description: 'Switch on lights in all working areas except war room and management cabins', status: TaskStatus.PENDING, remarks: '' },
      { id: 2, description: 'Switch on war room AC and air purifier and ensure temperature is set as per standards', status: TaskStatus.PENDING, remarks: '' },
      { id: 3, description: 'Open blinds/curtains (if required)', status: TaskStatus.PENDING, remarks: '' },
      { id: 4, description: 'Check cleanliness of reception, workstations, common areas, war room and pantry', status: TaskStatus.PENDING, remarks: '' },
    ],
  },
  {
    id: 'utilities',
    title: 'Utilities & Equipment Check',
    tasks: [
      { id: 1, description: 'Switch on printers, photocopiers and scanners', status: TaskStatus.PENDING, remarks: '' },
      { id: 2, description: 'Power on server panel/room', status: TaskStatus.PENDING, remarks: '' },
      { id: 3, description: 'Ensure all intercoms are clean', status: TaskStatus.PENDING, remarks: '' },
      { id: 4, description: 'Check internet connectivity', status: TaskStatus.PENDING, remarks: '' },
      { id: 5, description: 'Ensure pantry appliances (fridge, kettle, coffee machine) are working', status: TaskStatus.PENDING, remarks: '' },
      { id: 6, description: 'Ensure all table bells are functional', status: TaskStatus.PENDING, remarks: '' },
    ],
  },
  {
    id: 'reception',
    title: 'Reception & Guest Area',
    tasks: [
      { id: 1, description: 'Arrange reception desk items properly', status: TaskStatus.PENDING, remarks: '' },
      { id: 2, description: 'Check visitor/movement/courier inward and outward register', status: TaskStatus.PENDING, remarks: '' },
      { id: 3, description: 'Ensure meeting rooms are clean and ready', status: TaskStatus.PENDING, remarks: '' },
      { id: 4, description: 'Ensure illuminated world globe lights are on', status: TaskStatus.PENDING, remarks: '' },
      { id: 5, description: 'Ensure sofa side table magazines are well kept', status: TaskStatus.PENDING, remarks: '' },
    ],
  },
  {
    id: 'housekeeping',
    title: 'Housekeeping & Cleaning',
    tasks: [
      { id: 1, description: 'Ensure pantry boy is present', status: TaskStatus.PENDING, remarks: '' },
      { id: 2, description: 'Check if dustbins are cleared', status: TaskStatus.PENDING, remarks: '' },
      { id: 3, description: 'Ensure tea/coffee/sugar/milk stock is available', status: TaskStatus.PENDING, remarks: '' },
      { id: 4, description: 'Ensure war room, pantry, management cabins and work stations are clean', status: TaskStatus.PENDING, remarks: '' },
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance Check',
    tasks: [
      { id: 1, description: 'Check fire extinguishers & safety equipment', status: TaskStatus.PENDING, remarks: '' },
      { id: 2, description: 'Check for any maintenance issues (lights, AC, plumbing, chairs, TVs)', status: TaskStatus.PENDING, remarks: '' },
      { id: 3, description: 'Report any malfunctioning items to facility team', status: TaskStatus.PENDING, remarks: '' },
    ],
  },
];
