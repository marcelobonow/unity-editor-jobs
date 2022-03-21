using System.Collections;
using System.Collections.Generic;
using NUnit.Framework;
using UnityEditor;
using UnityEngine;

public class CentralizeTest : MonoBehaviour
{
    [Test]
    public void TestCentralize()
    {
        var referencePath = "Assets/Meshes/chairToTest.fbx";
        var referenceObject = AssetDatabase.LoadAssetAtPath<GameObject>(referencePath);
        var gameObjectOnScene = Instantiate(referenceObject);
        //var prefabPath = "Assets/Prefabs/chairToCreate.prefab";
        var meshes = gameObjectOnScene.GetComponentsInChildren<MeshFilter>(true);
        NormalizeMesh.Centralize(meshes);
        Assert.AreEqual(Vector3.zero, new Vector3(0, 0, 0));
    }
}
