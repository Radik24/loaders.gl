/* eslint-disable camelcase, indent */
export type {GLB} from './lib/types/glb-types';

// Raw GLTF Types (i.e. not post-processed)
export type {
  GLTF,
  GLTFAccessor,
  GLTFBuffer,
  GLTFBufferView,
  GLTFMeshPrimitive,
  GLTFMesh,
  GLTFNode,
  GLTFMaterial,
  GLTFSampler,
  GLTFScene,
  GLTFSkin,
  GLTFTexture,
  GLTFImage,
  GLTFObject,
  // The following extensions are handled by the GLTFLoader and removed from the parsed glTF (disable via options.gltf.excludeExtensions)
  GLTF_KHR_binary_glTF,
  GLTF_KHR_draco_mesh_compression,
  GLTF_KHR_texture_basisu,
  GLTF_EXT_meshopt_compression,
  GLTF_EXT_texture_webp,
  GLTF_EXT_feature_metadata,
  GLTF_EXT_feature_metadata_primitive,
  GLTF_EXT_feature_metadata_attribute,
  GLTF_EXT_mesh_features
} from './lib/types/gltf-json-schema';

// Postprocessed types (modified GLTF types)
export type {
  GLTFPostprocessed,
  GLTFAccessorPostprocessed,
  GLTFNodePostprocessed,
  GLTFMaterialPostprocessed,
  GLTFMeshPostprocessed,
  GLTFMeshPrimitivePostprocessed,
  GLTFImagePostprocessed,
  GLTFTexturePostprocessed
} from './lib/types/gltf-postprocessed-schema';

export type {GLTFWithBuffers} from './lib/types/gltf-types';

// glTF loader/writer definition objects
export {GLTFLoader} from './gltf-loader';
export {GLTFWriter} from './gltf-writer';

// GLB Loader & Writer (for custom formats that want to leverage the GLB binary "envelope")
export {GLBLoader} from './glb-loader';
export {GLBWriter} from './glb-writer';

// glTF Data Access Helper Class
export {GLTFScenegraph} from './lib/api/gltf-scenegraph';
export {postProcessGLTF} from './lib/api/post-process-gltf';
export {getMemoryUsageGLTF as _getMemoryUsageGLTF} from './lib/gltf-utils/gltf-utils';

/** @deprecated */
// export type {GLTFMesh as Mesh} from './lib/types/gltf-json-schema';
/** @deprecated */
// export type {GLTFNodePostprocessed as Node} from './lib/types/gltf-postprocessed-schema';
/** @deprecated */
// export type {GLTFAccessorPostprocessed as Accessor} from './lib/types/gltf-postprocessed-schema';
// /** @deprecated */
// export type {GLTFImagePostprocessed as Image} from './lib/types/gltf-postprocessed-schema';
