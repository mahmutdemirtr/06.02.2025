import { defineBackend } from '@aws-amplify/backend';
import { myFirstFunction } from './my-first-function/resource';

defineBackend({
  myFirstFunction,
});