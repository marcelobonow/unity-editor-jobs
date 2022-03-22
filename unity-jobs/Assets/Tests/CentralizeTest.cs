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
        var meshesToCentralize = new string[] { "Assets/Tests/benchToTest.fbx", "Assets/Tests/chairToTest.fbx", "Assets/Tests/shelfToTest.fbx" };
        var meshesToTest = new string[] { "Assets/Tests/benchCentralized.prefab", "Assets/Tests/chairCentralized.prefab", "Assets/Tests/shelfCentralized.prefab" };

        for (int i = 0; i < meshesToCentralize.Length; i++)
        {
            var benchToCentralize = LoadAtPath(meshesToCentralize[i]);
            var benchCentralized = LoadAtPath(meshesToTest[i]);

            var gameObjectOnScene = Instantiate(benchToCentralize);
            NormalizeMesh.Centralize(gameObjectOnScene);
            gameObjectOnScene = gameObjectOnScene.transform.parent.gameObject;

            PrefabUtility.SaveAsPrefabAsset(gameObjectOnScene, "Assets/Meshes/chairToTest2.prefab");

            Assert.AreEqual(benchCentralized.transform.localPosition, benchCentralized.transform.localPosition);

            var colliderOnScene = gameObjectOnScene.transform.GetChild(0).GetComponent<BoxCollider>();
            var colliderCentralized = benchCentralized.transform.GetChild(0).GetComponent<BoxCollider>();

            Assert.AreEqual(colliderCentralized.center, colliderOnScene.center);
            Assert.AreEqual(colliderCentralized.size, colliderOnScene.size);
            DestroyImmediate(gameObjectOnScene);
        }

    }

    private GameObject LoadAtPath(string path) => AssetDatabase.LoadAssetAtPath<GameObject>(path);
}
