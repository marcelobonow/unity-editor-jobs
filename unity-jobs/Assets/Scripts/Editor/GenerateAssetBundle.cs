using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

public class GenerateAssetBundle : MonoBehaviour
{
    public static void ExecuteMethod()
    {
        Debug.Log("Funcionando");
        EditorApplication.Exit(0);
    }

    [ContextMenu("Test")]
    public static void CreatePrefab()
    {
        Debug.Log("Testando criar prefab");
        var referenceObject = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Meshes/chairToCreate.fbx");
        var gameobjectOnScene = Instantiate(referenceObject);
        PrefabUtility.SaveAsPrefabAsset(gameobjectOnScene, "Assets/Prefabs/chairToCreate.prefab");
        DestroyImmediate(gameobjectOnScene);
    }
}
