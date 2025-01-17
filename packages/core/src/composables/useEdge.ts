import { inject, ref } from 'vue'
import type { CustomEvent, ElementData } from '../types'
import { ErrorCode, VueFlowError } from '../utils'
import { EdgeId, EdgeRef } from '../context'
import { useVueFlow } from './useVueFlow'

/**
 * Access an edge
 *
 * If no edge id is provided, the edge id is injected from context
 *
 * Meaning if you do not provide an id, this composable has to be called in a child of your custom edge component, or it will throw
 */
export function useEdge<Data = ElementData, CustomEvents extends Record<string, CustomEvent> = any>(id?: string) {
  const edgeId = id ?? inject(EdgeId, '')
  const edgeEl = inject(EdgeRef, ref(null))

  const { findEdge, emits } = useVueFlow()

  const edge = findEdge<Data, CustomEvents>(edgeId)

  if (!edge) {
    emits.error(new VueFlowError(ErrorCode.EDGE_NOT_FOUND, edgeId))
  }

  return {
    id: edgeId,
    edge,
    edgeEl,
  }
}
