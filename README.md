# Neurone

<a href="https://npmjs.com/package/neurone">
        <img alt="Npm package" src="https://img.shields.io/npm/v/neurone?label=neurone&logo=npm&style=social"></a>

A [Matrix](https://matrix.org) client-server SDK focusing on simplicity,
performance, composable architecture and independent spec-based development.

**Spec Compatibility**: v1.0 to v1.15

## Scope

Neurone provides a low-level interface to the Matrix Client-Server API. 
It handles protocol communication and exposes the primitives needed to 
build Matrix clients, while leaving application-specific behavior to the
libraries and applications built on top of it.

Neurone does not aim to be a batteries-included client SDK. Features 
such as room state management, sync orchestration, message queues, retries, 
and UI-oriented abstractions should live in higher-level libraries where 
possible. The goal is to keep the core small and composable, so applications 
can choose how much functionality they need without inheriting a large framework.

## Local development

Execute the following commands to build the package:

```
npm run build # Build package into lib directory
```

## License
Cinny Project  
Copyright © 2024–present Ajay Bura  
https://cinny.in

Neurone is licensed under the Apache License, Version 2.0.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
