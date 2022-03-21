using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NormalizeMesh : MonoBehaviour
{
    public static void Centralize(GameObject gameObject)
    {
        var meshFilters = gameObject.GetComponentsInChildren<MeshFilter>(true);
        var center = Vector3.zero;
        var maxBounds = Vector3.negativeInfinity;
        var minBounds = Vector3.positiveInfinity;
        foreach (var meshFilter in meshFilters)
        {
            var bounds = meshFilter.sharedMesh.bounds;
            var localPosition = meshFilter.transform.position;
            center += bounds.center + localPosition;
            maxBounds = Vector3.Max(maxBounds, bounds.max + localPosition);
            minBounds = Vector3.Min(minBounds, bounds.min - localPosition);
        }

        center /= meshFilters.Length;

        var newGameObject = new GameObject();
        newGameObject.name = gameObject.name;
        gameObject.transform.parent = newGameObject.transform;
        gameObject.transform.position -= center;
        newGameObject.transform.position = Vector3.zero;
        //gameObject.transform.localPosition = Vector3.

        var collider = newGameObject.AddComponent<BoxCollider>();
        collider.center = (maxBounds + minBounds) / 2f;
        collider.size = (maxBounds - minBounds);
    }
}
