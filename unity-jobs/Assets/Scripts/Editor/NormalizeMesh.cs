using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NormalizeMesh : MonoBehaviour
{
    public static void Centralize(GameObject gameObject)
    {
        var meshFilters = gameObject.GetComponentsInChildren<MeshFilter>(true);
        var maxBounds = Vector3.negativeInfinity;
        var minBounds = Vector3.positiveInfinity;
        foreach (var meshFilter in meshFilters)
        {
            var bounds = meshFilter.sharedMesh.bounds;
            var localPosition = meshFilter.transform.position;
            var vertices = meshFilter.sharedMesh.vertices;
            for (int i = 0; i < vertices.Length; i++)
            {
                maxBounds = Vector3.Max(maxBounds, meshFilter.transform.TransformPoint(vertices[i]));
                minBounds = Vector3.Min(minBounds, meshFilter.transform.TransformPoint(vertices[i]));
            }
        }

        var center = (maxBounds + minBounds) / 2f;
        var newGameObject = new GameObject();
        newGameObject.name = gameObject.name;
        gameObject.transform.parent = newGameObject.transform;
        gameObject.transform.position -= center;
        newGameObject.transform.position = Vector3.zero;

        var collider = gameObject.AddComponent<BoxCollider>();
        collider.center = center;
        collider.size = (maxBounds - minBounds);
    }
}
