using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NormalizeMesh
{
    public static void Centralize(MeshFilter[] meshFilters)
    {

        foreach (var meshFilter in meshFilters)
        {
            var center = Vector3.zero;
            var vertices = meshFilter.sharedMesh.vertices;
            for (int i = 0; i < vertices.Length; i++)
                center += vertices[i];

            for (int i = 0; i < vertices.Length; i++)
                vertices[i] -= center;

            meshFilter.sharedMesh.vertices = vertices;
        }
    }
}
